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
          body: '<p><code>Estado Alpha - Utilizar solo para realizar pruebas o aprender</code></p><p>DevNote es una <code>PWA</code> (ProgressiveWebApp) para crear notas que utiliza las capacidades de almacenamiento local de los navegadores para trabajar sin necesidad de estar conectado a internet.</p><h2>Instalación local</h2><pre><code class="text-xs leading-6 break-all"><div data-node-view-content="" style="white-space: pre-wrap;"><span style="color: rgb(0, 218, 239);">git</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">clone</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">https://github.com/santuan/devnote</span><span style="color: rgb(0, 218, 239);">npm</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">install</span><span style="color: rgba(238, 240, 249, 0.56);">## Entorno desarrollo</span><span style="color: rgb(0, 218, 239);">npm</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">run</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">dev</span><span style="color: rgba(238, 240, 249, 0.56);">## Generar aplicación optimizada</span><span style="color: rgb(0, 218, 239);">npm</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">run</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">build</span><span style="color: rgb(0, 218, 239);">npm</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">run</span><span style="color: rgb(238, 240, 249);"> </span><span style="color: rgb(255, 212, 147);">preview</span></div></code></pre><h4>También podes abrirlo en StackBlitz</h4><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://stackblitz.com/~/github.com/santuan/capy-localfirst-noteapp?startScript=devnote">https://stackblitz.com/~/github.com/santuan/devnote?startScript=devnote</a></p><h2><strong>Tecnologías</strong></h2><h3><strong>Backend</strong></h3><ul><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://dexie.org/">Dexie.js</a><strong> </strong>Wrapper minimalista de IndexedDB.</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://rxjs.dev/">RxJS </a>Reactive Extensions for modern JavaScript.</p></li></ul><h3>Frontend</h3><ul><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://vuejs.org/guide/introduction.html#what-is-vue">Vue.js</a> 💚</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://vueuse.org/">VueUse</a> Colección de utilidades para Vue.</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://www.radix-vue.com/">RadixVue </a>Componentes accesibles para construir sistemas de diseño y aplicaciones web.</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://pinia.vuejs.org/">Pinia</a> Manejo de estados.</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://shiki.style/guide/install">Shiki</a> Syntax highlight.</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://tailwindcss.com/">TailwindCSS </a>💙</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://tiptap.dev/product/editor">TipTap</a> Editor de texto enriquecido.</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://github.com/francoischalifour/medium-zoom">MediumZoom</a> Para ampliar las imágenes (solo modo previsualizar).</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://driverjs.com/docs/installation">Driver.js </a>Para hacer recorridos de productos.</p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://vue-sonner.vercel.app/">Vue-Sooner</a> - Notificaciones flotantes.</p></li></ul><h2>Atajos de teclado</h2><ul><li><p><code>Ctrl+Alt+P</code> Alternar entre modo editar o previsualizar.</p></li><li><p><code>Ctrl+Alt+O</code> Barra de comandos para navegar documentos.</p></li><li><p><code>Ctrl+M</code> Colapsar el menu.</p></li><li><p><code>Ctrl+Alt+I</code> Importar DB</p></li><li><p><code>Ctrl+Alt+E</code> Exportar DB</p></li><li><p><code>Ctrl+Alt+FlechaDerecha</code> expande el area de edición.</p></li><li><p><code>Ctrl+Alt+FlechaIzquierda</code> colapsa el area de edición.</p></li></ul><h2><strong>Editor de Texto Enriquecido</strong></h2><p>La aplicación incorpora un potente editor de texto enriquecido.</p><ul><li><p><code>Bloques de código</code> - Resaltado de sintaxis para más de 250 lenguajes.</p></li><li><p><code>Formateo de texto</code><strong> </strong>- links, bold, italic, subrayado, alineación, listas, citas y enlaces,</p></li><li><p><code>Imágenes</code> Pueden insertarse como Base64 o mediante URL externas (no funciona offline)</p></li><li><p><code>Videos</code> Se puede insertar desde Youtube o cargarlos por URL externa (no funciona offline)</p></li></ul><h3><strong>Interfaz</strong></h3><ul><li><p>Temas de color personalizables.</p></li><li><p>Modo Claro/Oscuro/Sistema.</p></li><li><p>Navegación rápida entre notas con la barra de comandos y acciones.</p></li><li><p>Vista previa de documentos</p></li><li><p>Notificaciones</p></li></ul><h3><strong>Más Funcionalidades</strong></h3><ul><li><p>Se puede copiar y pegar texto con formato.</p></li><li><p>Exportación e importación de la base de datos en formato <code>json</code> (solo exportados desde la app).</p></li><li><p>Autoguardado de documentos una vez creados.</p></li><li><p>Marcar los documentos como <code>fijos</code> o como <code>realizados</code></p></li><li><p><a target="_blank" rel="noopener" class="px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80" href="https://vueuse.org/core/useMagicKeys/">useMagicKeys </a>Atajos de teclado para acciones comunes.</p><p><br class="ProseMirror-trailingBreak"></p></li></ul><h3><strong>Enfoque en la Accesibilidad y UX </strong></h3><p>Componentes accesibles utilizando Radix Vue. </p><p><br class="ProseMirror-trailingBreak"></p><ul><li><p><code>Elementos en foco</code> Diseño enfocado para resaltar </p></li><li><p><code>Contrastes de color</code>  <em>En proceso para los 5 ctemas</em></p></li><li><p><code>ARIA</code> <em>En proceso</em> </p></li><li><p><code>Responsive</code> Diseño responsive para adaptarse a todos los dispositivos.</p></li><li><p><code>Tooltips</code> informativos para las acciones principales.</p></li><li><p><code>Focus Trap</code></p></li><li><p><code>Tabs</code> Navegación</p></li><li><p><code>Esc</code> Para cerrar los Dialog, dropdowns,  </p></li><li><p><code>Flechas teclado</code> Moverse con las flechas en menues y desplegables (ej: selector de tema)</p></li></ul><h2>🤓 Pequeños grandes detalles</h2><ul><li><p>Favicon se modifica al modificar el tema de color.</p></li><li><p>Posibilidad de modificar el puntero del mouse.</p></li><li><p>Arrastrar archivos al sidebar (exportados desde esta app en formato <code>json</code> ) va importar la base al soltar.</p></li><li><p>Al editar el nombre de la DB se puede confirmar haciendo click afuera.</p></li></ul><p><br><br class="ProseMirror-trailingBreak"></p>',
          name: "Introducción a DevNote",
          checked: false,
          fixed: true,
        };

        const settings = useSettingsStore();
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
