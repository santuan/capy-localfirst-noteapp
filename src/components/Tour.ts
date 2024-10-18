import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

function DriverJsInit() {

  const productTourSeen = localStorage.getItem('product_tour_seen') === 'true';

  if (productTourSeen) { return; }

  const driverObj = driver({
    allowClose: true,
    animate: false,
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
          description: 'Vamos a crear un nuevo documento que se guardara localmente en tu navegador. Podés navegar este tutorial con utilizando las flechas del teclado.',
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
          description: 'Escribi en el campo de texto un título para poder reconocerlo. Una vez realizado hacer click en siguiente',
          side: 'bottom',
          align: 'center'
        },
      },
      {
        element: '.EditorCK',
        popover: {
          title: 'Editor de texto',
          description: 'Aquí podrás añadir texto enriquecido, bloques de código bonitos para 295 lenguajes, imágenes y videos de YouTube.',
          side: 'left',
          align: 'center'
        }
      },
      {
        element: '.GuardarDocumento',
        popover: {
          title: 'Agregar documento',
          description: 'Para crear un documento se requiere minimamente un titulo. Hace click en Guardar para agregar el documento en la DB. Una vez creado el documento los cambios se guardarán automaticamente.',
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '.SidebarProjects',
        popover: {
          title: 'Documento creado',
          description: 'Aquí se irán guardando los documentos en tu indexdedDB. Podes fijarlos o marcarlos como completados',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '.ToggleEditable',
        popover: {
          title: 'Vista previa',
          description: 'Alterna entre la vista de edición y la vista previa del documento.',
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
          description: 'Si así lo deseas tambien puedes eliminar el documento directamente.',
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