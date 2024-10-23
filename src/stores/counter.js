import { shallowRef } from "vue";
import { defineStore } from "pinia";
import { db } from "@/db";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { exportDB, importInto } from "dexie-export-import";
import { toast } from 'vue-sonner'
import { useSettingsStore } from "@/stores/settings";

export const useCounterStore = defineStore("counter", () => {
  const status = shallowRef("LOADING");
  const loaded_id = shallowRef("");
  const file_name = shallowRef("Mi base de datos local");
  const project_name = shallowRef("");
  const project_body = shallowRef("");
  const project_checked = shallowRef(null);
  const project_fixed = shallowRef(null);
  const searchTerm = shallowRef("");
  const showProjects = shallowRef(true);
  const showImportModal = shallowRef(false);
  const showShareModal = shallowRef(false);
  const shareOptions = shallowRef([]);
  const content_editable = shallowRef(true);
  const editor = shallowRef(null);
  const showSettings = shallowRef(false);

  function toggleEditable() {
    content_editable.value = !content_editable.value;
  }

  function clear_editor() {
    loaded_id.value = "";
    project_name.value = "";
    project_body.value = "";
  }

  async function create_project() {
    try {
      status.value = "CHANGING";
      const new_project_id = await db.projects.add({
        date: new Date().toISOString(),
        date_created: new Date().toISOString(),
        project_data: {
          body: project_body.value,
          name: project_name.value,
          checked: false,
          fixed: false,
        },
      });
      loaded_id.value = new_project_id;
      status.value = "READY";
    } catch (error) {
      handleError("Error al crear el proyecto", error);
    }
  }

  async function update_project() {
    try {
      await db.projects.update(loaded_id.value, {
        date: new Date().toISOString(),
        project_data: {
          body: project_body.value,
          name: project_name.value,
          checked: project_checked.value,
          fixed: project_fixed.value,
        },
      });
    } catch (error) {
      handleError("Error al actualizar el proyecto", error);
    }
  }

  async function change_project_checked(item, isChecked) {
    try {
      await db.projects.update(item.id, {
        date: new Date().toISOString(),
        project_data: {
          body: item.project_data.body,
          name: item.project_data.name,
          checked: isChecked,
          fixed: false
        },
      });
      toast(isChecked ? `Proyecto "${item.project_data.name}" marcado como completado` : `Proyecto "${item.project_data.name}" desmarcado`);
    } catch (error) {
      handleError("Error al marcar el proyecto", error);
    }
  }

  async function change_project_fixed(item, isFixed) {
    try {
      await db.projects.update(item.id, {
        date: new Date().toISOString(),
        project_data: {
          body: item.project_data.body,
          name: item.project_data.name,
          checked: item.project_data.checked,
          fixed: !isFixed
        },
      });
    } catch (error) {
      handleError("Error al marcar el proyecto", error);
    }
  }

  async function set_project(id) {
    const selectedId = id ? parseInt(id, 10) : null;
    if (selectedId === loaded_id.value) return;
    status.value = "CHANGING";
    try {
      if (selectedId === null) {
        clear_editor();
      } else {
        const selectedState = await db.projects.get(selectedId);
        if (selectedState) {
          project_body.value = selectedState.project_data.body;
          project_name.value = selectedState.project_data.name;
          project_fixed.value = selectedState.project_data.fixed;
          project_checked.value = selectedState.project_data.checked;
        } else {
          clear_editor();
          console.error("Selected project not found");
        }
        loaded_id.value = selectedId;
      }
    } catch (error) {
      handleError("Error al seleccionar el proyecto", error);
    }
    status.value = "READY";
  }

  async function delete_project() {
    try {
      await db.projects.delete(loaded_id.value);
      clear_editor();
    } catch (error) {
      handleError("Error al eliminar el proyecto", error);
    }
  }

  function auto_save() {
    if (project_name.value === "") return;
    if (status.value !== "READY") return;
    update_project();
  }

  async function export_database(filename) {
    try {
      await db.open();
      const blob = await exportDB(db);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename || file_name.value}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Base de datos exportada');
      return blob;
    } catch (error) {
      toast.error('Error al exportar la base de datos');
      handleError("Error al exportar la base de datos", error);
    }
  }

  async function share_database() {
    try {
      await db.open();
      const blob = await exportDB(db);
      const reader = new FileReader();
      reader.onloadend = () => {
        const text = reader.result;
        const json = JSON.parse(text);
        shareOptions.value = JSON.stringify(json, null, 2);
      };
      reader.readAsText(blob);
    } catch (error) {
      handleError("Error al exportar la base de datos", error);
    }
  }

  async function import_database(file) {
    const replace_file_name = file.name.replace(".json", "");
    try {
      await clearDatabase();
      await importInto(db, file, {});
      update_database(replace_file_name);
      showImportModal.value = false
      clear_editor();
      searchTerm.value = "";
      toast.success('Base de datos importada')
    } catch (error) {
      toast.error('Error al importar la base de datos')
      handleError("Error al importar la base de datos", error);
    }
  }

  async function clearDatabase() {
    await db.projects.clear();
    await db.file.clear();
    clear_editor();
  }

  async function init_database() {
    try {
      const count = await db.file.count();
      if (count === 0) {
        await db.file.add({
          date: new Date().toISOString(),
          name: file_name.value,
        });

        // Crear el primer proyecto
        const initialProjectData = {
          body: '<h1>¡Hello & Welcome!</h1><p>Esta es una aplicación para tomar notas con texto enriquecido que se guardan localmente en tu navegador.</p><p>Algunas características:</p><ul><li><p>Texto enriquecido con múltiples opciones de formato</p></li><li><p>Soporte para bloques de código con resaltado de sintaxis</p></li><li><p>Imágenes y videos de YouTube</p></li><li><p>Exportación e importación de la base de datos</p></li></ul><pre spellcheck=\"false\"><code class=\"language-ts\">// javascript\nasync function toggle() {\n   console.log(\"Log\")\n}</code></pre><pre spellcheck=\"false\"><code class=\"language-css\">/* CSS */\n.class {\n   min-height: 80vh\n}</code></pre><pre spellcheck=\"false\"><code class=\"language-php\">/* php */\n&lt;?{ if } &gt;</code></pre><pre spellcheck=\"false\"><code class=\"language-html\">&lt;!-- html --&gt;\n&lt;div&gt;\n    &lt;button class=\"btn red\" disabled&gt;\n        Click Me!\n    &lt;/button&gt;\n    &lt;img id=\"loading\" class=\"loading\" src=\"/spinner.gif\"/&gt;\n&lt;/div&gt;</code></pre><pre spellcheck=\"false\"><code class=\"language-python\">## Python\nfrom PyPDF2 import PdfReader\n\ndef verificar(hash):\n    input = PdfReader(hash)</code></pre><pre spellcheck=\"false\"><code class=\"language-bash\">Module \"path\" has been externalized for browser compatibility.</code></pre><pre spellcheck=\"false\"><code class=\"language-csv\">Index,Organization Id,Name,Website,Country,Description,Founded,Industry,Number of employees\n1,FAB0d41d5b5d22c,Ferrell LLC,https://price.net/,Papua New Guinea,Horizontal empowering knowledgebase,1990,Plastics,3498\n2,6A7EdDEA9FaDC52,\"Mckinney, Riley and Day\",http://www.hall-buchanan.info/,Finland,User-centric system-worthy leverage,2015,Glass / Ceramics / Concrete,4952\n3,0bFED1ADAE4bcC1,Hester Ltd,http://sullivan-reed.com/,China,Switchable scalable moratorium,1971,Public Safety,5287\n4,2bFC1Be8a4ce42f,Holder-Sellers,https://becker.com/,Turkmenistan,De-engineered systemic artificial intelligence,2004,Automotive,921\n5,9eE8A6a4Eb96C24,Mayer Group,http://www.brewer.com/,Mauritius,Synchronized needs-based challenge,1991,Transportation,7870\n6,cC757116fe1C085,Henry-Thompson,http://morse.net/,Bahamas,Face-to-face well-modulated customer loyalty,1992,Primary / Secondary Education,4914\n7,219233e8aFF1BC3,Hansen-Everett,https://www.kidd.org/,Pakistan,Seamless disintermediate collaboration,2018,Publishing Industry,7832\n8,ccc93DCF81a31CD,Mcintosh-Mora,https://www.brooks.com/,Heard Island and McDonald Islands,Centralized attitude-oriented capability,1970,Import / Export,4389\n9,0B4F93aA06ED03e,Carr Inc,http://ross.com/,Kuwait,Distributed impactful customer loyalty,1996,Plastics,8167</code></pre><p></p><pre spellcheck=\"false\"><code class=\"language-cobol\">*&gt; spaces are only trailing.)\n    display \"(plain) Enter a value: \" with no advancing\n    accept ws-user-input\n\n    if ws-user-input is numeric then\n        display ws-user-input \" is numeric!\"\n    else\n        display ws-user-input \" is not numeric.\"\n    end-if\n\n    exit paragraph.</code></pre><pre spellcheck=\"false\"><code class=\"language-dockerfile\">FROM node:22\nWORKDIR /app\nCOPY package.json\nRUN npm install\nCOPY . .\nEXPOSE 8000\nCMD [ \"npm\", \"run\", \"dev\" ]</code></pre><p></p>',
          name: "Introducción a DevNote",
          checked: false,
          fixed: false,
        };

        const settings = useSettingsStore();
        console.log(settings.init_empty)
        if (settings.init_empty === true) {
          status.value = "CHANGING";
          const new_project_id = await db.projects.add({
            date: new Date().toISOString(),
            date_created: new Date().toISOString(),
            project_data: initialProjectData,
          });

          // Cargar el proyecto en el editor
          project_body.value = initialProjectData.body;
          project_name.value = initialProjectData.name;
          project_fixed.value = initialProjectData.fixed;
          project_checked.value = initialProjectData.checked;
          loaded_id.value = new_project_id;
          status.value = "READY";
        }


      } else if (count === 1) {
        const selectedState = await db.file.get(1);
        if (selectedState) file_name.value = selectedState.name;
      }
    } catch (error) {
      handleError("Error al configurar la base de datos", error);
    }
  }

  async function update_database(name) {
    try {
      file_name.value = name;
      await db.file.update(1, {
        date: new Date().toISOString(),
        name,
      });
    } catch (error) {
      handleError("Error al actualizar la base de datos", error);
    }
  }

  function handleError(message, error) {
    console.error(message, error);
    status.value = "ERROR";
  }

  const allItemsTodo = useObservable(
    liveQuery(() =>
      db.projects
        .reverse()
        .toArray()
        .then(items => items.filter(item => !item.project_data.checked))
    )
  );

  const allItemsChecked = useObservable(
    liveQuery(() =>
      db.projects
        .reverse()
        .toArray()
        .then(items => items.filter(item => item.project_data.checked))
    )
  );

  return {
    loaded_id,
    file_name,
    project_body,
    project_name,
    project_checked,
    project_fixed,
    searchTerm,
    status,
    allItemsTodo,
    allItemsChecked,
    showProjects,
    shareOptions,
    init_database,
    update_database,
    import_database,
    export_database,
    share_database,
    set_project,
    create_project,
    update_project,
    delete_project,
    auto_save,
    clear_editor,
    editor,
    change_project_checked,
    change_project_fixed,
    showImportModal,
    showShareModal,
    content_editable,
    toggleEditable,
    showSettings,
    clearDatabase
  };
});
