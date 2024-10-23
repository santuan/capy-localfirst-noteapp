import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

function DriverJsInit() {

  const productTourSeen = localStorage.getItem('product_tour_seen') === 'true';

  if (productTourSeen) { return; }

  const driverObj = driver({
    allowClose: true,
    animate: false,
    stagePadding: 1,
    stageRadius: 2,
    nextBtnText: 'Siguiente',
    prevBtnText: 'Anterior',
    doneBtnText: 'Comenzar',
    popoverClass: 'driverjs-theme',
    progressText: '{{current}} de {{total}}',
    showProgress: true,
    steps: [
      {
        popover: {
          title: 'Holis 👋',
          description: 'Este tutorial se puede navegar utilizando las flechas del teclado. Puede repetirlo desde la configuración.',
        }
      },
      // {
      //   element: '.DataBaseTitle',
      //   popover: {
      //     title: 'Nombre del proyecto',
      //     description: 'Aquí podrás editar el nombre de la base de datos (DB) local.',
      //     side: 'bottom',
      //     align: 'center'
      //   }
      // },

      {
        element: '.create_project',
        popover: {
          title: 'Título del documento',
          description: 'Podes editar este campo de texto a gusto con el nombre que prefieras para luego identificarlo.',
          side: 'bottom',
          align: 'center'
        },
      },
      {
        element: '.EditorCK',
        popover: {
          title: 'Editor de texto',
          description: 'Aquí podrás añadir texto enriquecido, imágenes y videos desde una url así como también videos de YouTube.',
          side: 'left',
          align: 'center'
        }
      },
      {
        element: '.prose div.code-block.group:nth-of-type(1)',
        popover: {
          title: 'Shiki para resaltar el código',
          description: 'Gracias a esto se pueden agregar bloques de código bonitos para 295 lenguajes.',
          side: 'top',
          align: 'start'
        }
      },
      
      // {
      //   element: '.GuardarDocumento',
      //   popover: {
      //     title: 'Agregar documento',
      //     description: 'Para crear un documento se requiere minimamente un titulo. Hace click en Guardar para agregar el documento en la DB. Una vez creado el documento los cambios se guardarán automaticamente.',
      //     side: 'top',
      //     align: 'center'
      //   }
      // },
      {
        element: '.SidebarProjects',
        popover: {
          title: 'Documento creados',
          description: 'Aquí se irán guardando los documentos en tu indexdedDB. Podes fijarlos o marcarlos como completados',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '.ToggleEditable',
        popover: {
          title: 'Vista previa',
          description: 'Alterna entre la vista de edición y la vista previa del documento. Las imágenes pueden agrandarse en el modo vista previa. Los videos desde url solo se pueden reproducir en este modo (por ahora)',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '.SidebarBottom',
        popover: {
          title: 'Importar y exportar',
          description: 'Guarda la base de datos en formato JSON para importarla en otro navegador.',
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '.ButtonDeleteDocument',
        popover: {
          title: 'Eliminar documento',
          description: 'Si así lo deseas también puedes eliminar el documento directamente.',
          side: 'top',
          align: 'center'
        }
      },
      {
        popover: {
          title: '¡Listo!',
          description: '¡Disfruta de la experiencia!',
        }
      }
    ],

    onDestroyed: () => {
      localStorage.setItem('product_tour_seen', 'true');
    }
  });

  driverObj.drive();
}


export default DriverJsInit