import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';

import { GoogleSheetsService } from '../google-sheets.service';
import { google } from 'googleapis';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  dataFromSheets: any[] = ['juan','epa'];
  formulario!: FormGroup;
  preguntas: any[] = [];
  perfilFinal: any[] = [];
  perfil: string = '';
  perfilUsuario: string = '';

  constructor(private formBuilder: FormBuilder,
              private ngZone: NgZone,
               private googleSheetsService: GoogleSheetsService ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required], 
      edad: [null, [Validators.required, Validators.min(18)]], // Campo de edad con validación requerida y mínimo 1
      sexo: ['', Validators.required], // Agregado: Campo de sexo con validación requerida
      encuestaAnterior: ['', Validators.required], // Agregado: Campo de encuesta anterior con validación requerida
      perfilAnterior: ['', Validators.required], // Agregado: Campo de perfil anterior con validación requerida
      estadoCivil: ['', Validators.required], // FormControl para el estado civil con validador requerido
      nivelAcademico: ['', Validators.required], // FormControl para el nivel academico con validador requerido
      aceptaTratamientoDatos: [false, Validators.requiredTrue],  // FormControl para el checkbox con validador requerido y debe ser true
    });

    //const nombreUsuario = this.formulario.value.nombre;
   
    this.formulario.get('nombre')?.valueChanges.subscribe((nombre) => {
      this.preguntas = this.obtenerPreguntas(nombre);
    });

    this.formulario.get('nombre')?.valueChanges.subscribe((nombre) => {
      this.perfilFinal = this.obtenerPerfil(nombre);
    });
  }

   enviarDatos(Datos: any[]) {
    const arreglo = Datos; // Cambia esto por tu arreglo
    this.googleSheetsService.enviarDatos(arreglo).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);
      },
      (error) => {
        console.error('Error al enviar arreglo:', error);
      }
    );
  } 

  obtenerPreguntas(nombre: string): any[] {
    return [
      {
        pregunta: `${nombre}, ¿Si un día recibieras una cantidad significativa de dinero inesperado, ¿cómo te gustaría utilizarlo?`,
        opciones: [
          { respuesta: 'Lo primero sería guardar una buena parte para el futuro y tal vez quitarme algunas deudas de encima.', puntaje: 1 },
          { respuesta: 'Invertiría una parte en acciones y otra la dejaría en el banco para emergencias.', puntaje: 2 },
          { respuesta: 'Usaría algo para mejorar mi casa y el resto lo metería en una cuenta de inversión para verlo crecer con el tiempo.', puntaje: 3 },
          { respuesta: 'Pensaría en invertir en mi educación o en un negocio propio, y el resto podría ir para darme un buen gusto, como un viaje que siempre haya querido hacer.', puntaje: 4 }
        ],
        respuesta: { respuesta: '', puntaje: 0 }
      },
      {
        pregunta: `${nombre}, Cuando se trata de manejar tu dinero, ¿te sientes más cómodo(a) tomando riesgos y buscando oportunidades emocionantes, o prefieres ir por el camino más seguro y estable?`,
        opciones: [
          { respuesta: 'Definitivamente me emociona tomar riesgos y buscar oportunidades emocionantes. Siempre estoy buscando nuevas formas de invertir y probar cosas nuevas.', puntaje: 3 },
          { respuesta: 'Prefiero tomar algunos riesgos moderados, pero también me aseguro de no exagerar. Busco invertir en opciones interesantes, pero con cautela.', puntaje: 2 },
          { respuesta: 'Me siento más cómodo con el camino seguro y estable. Prefiero no correr muchos riesgos y buscar inversiones más seguras.', puntaje: 1 },
          { respuesta: 'Soy un entusiasta de los desafíos financieros. No temo asumir riesgos altos en busca de mayores ganancias, ¡la adrenalina me motiva!', puntaje: 4 }
        ],
        respuesta: { respuesta: '', puntaje: 0 }
      },
      {
        pregunta: `${nombre}, ¿Has probado alguna vez invertir tu dinero en cosas como acciones, bonos, fondos de inversión u otros proyectos interesantes?`,
        opciones: [
          { respuesta: 'No, nunca he invertido mi dinero en nada más allá de una cuenta de ahorros o CDT. Prefiero mantenerlo seguro y accesible en caso de emergencia.', puntaje: 1 },
          { respuesta: 'He probado invertir en algunos fondos de inversión y acciones, pero sin arriesgar demasiado.', puntaje: 2 },
          { respuesta: 'Sí, he invertido en acciones y algunos proyectos emocionantes. Disfruto asumiendo riesgos calculados para obtener mayores ganancias.', puntaje: 3 },
          { respuesta: '¡Definitivamente! He invertido en criptomonedas, startups y otros proyectos interesantes. Estoy dispuesto a correr riesgos altos en busca de oportunidades emocionantes.', puntaje: 4 }
        ],
        respuesta: { respuesta: '', puntaje: 0 }
      },
      {
        pregunta: `${nombre}, Si pudieras elegir entre gastar tu dinero en un café todos los días o ahorrarlo para el futuro, como por ejemplo para el estudio de tus hijos o tu pensión, ¿qué opción elegirías?`,
        opciones: [
          { respuesta: 'Definitivamente ahorraría para el futuro, es importante y quiero asegurarme de tener mejores oportunidades.', puntaje: 1 },
          { respuesta: 'Probablemente ahorraría para el futuro, pero también me daría algún gusto ocasional con el café.', puntaje: 2 },
          { respuesta: 'Lo siento, ¡no puedo resistirme a un buen café diario! Quizás pueda ahorrar algo para el futuro, pero también quiero disfrutar el presente.', puntaje: 3 },
          { respuesta: 'Prefiero disfrutar del café diario y no pensar demasiado en el futuro.', puntaje: 4 }
        ],
        respuesta: { respuesta: '', puntaje: 0 }
      },
      {
        pregunta: `${nombre}, Supón que estás jugando un juego de mesa o videojuego en el que puedes ganar o perder puntos. Si en algún momento del juego pierdes puntos, ¿cómo te sentirías y qué harías para seguir adelante?`,
        opciones: [
          { respuesta: 'Me sentiría un poco frustrado si pierdo puntos, pero no me afectaría mucho. Seguiría concentrado y jugaría con más cuidado.', puntaje: 2 },
          { respuesta: 'No me gustaría perder puntos, pero eso me motiva a jugar más inteligentemente, buscaría recuperarme y ganar más puntos.', puntaje: 3 },
          { respuesta: 'Perder puntos sería decepcionante, me tomaría un descanso para despejar mi mente y luego volvería con una estrategia más cautelosa.', puntaje: 1 },
          { respuesta: 'Perder puntos sería una oportunidad para aprender y mejorar. Me emociona el desafío y me lanzaría a la acción para recuperar lo perdido.', puntaje: 4 }
        ],
        respuesta: { respuesta: '', puntaje: 0 }
      },
      {
        pregunta: `${nombre}, Imagina que estás cultivando una planta en tu jardín. ¿Cómo te sentirías si después de un mes, la planta aún no muestra ningún cambio significativo? ¿Seguirías cuidándola y esperando a que crezca, o te impacientarías y considerarías abandonarla?`,
        opciones: [
          { respuesta: 'No me importaría si la planta no muestra cambios significativos después de un mes. Seguiría cuidándola y teniendo paciencia, ya que sé que el crecimiento lleva tiempo.', puntaje: 4 },
          { respuesta: 'Me sentiría un poco impaciente. Quiero ver resultados, pero también entiendo que lleva tiempo.', puntaje: 3 },
          { respuesta: 'Estaría un poco frustrado si no veo resultados rápidos, seguiría cuidando la planta por un tiempo más. Si después de un tiempo no crece, quizás consideraría abandonarla.', puntaje: 2 },
          { respuesta: 'Si la planta no muestra cambios significativos después de un mes, me impacientaría mucho y consideraría abandonarla. Quiero ver resultados rápidos y no tengo tiempo para esperar.', puntaje: 1 }
        ],
        respuesta: { respuesta: '', puntaje: 0 }
      },      
      {
        pregunta: `${nombre}, ¿Cómo se encuentran tu salud financiera actualmente?`,
        opciones: [
          { respuesta: 'Mis gastos están muy por debajo de mis ingresos. Tengo la capacidad suficiente para ahorrar e invertir', puntaje: 4 },
          { respuesta: 'Mis gastos e ingresos están equilibrados. Puedo considerar hacer un ahorro.', puntaje: 3 },
          { respuesta: 'Mis gastos son casi iguales a mis ingresos. Quisiera ahorrar, pero tengo poca capacidad para hacerlo.', puntaje: 2 },
          { respuesta: 'Mis gastos son superiores a mis ingresos. Definitivamente ahorrar es imposible.', puntaje: 1 }
        ],
        respuesta: { respuesta: '', puntaje: 0 }
      },  
];}

obtenerPerfil(nombre: string): any[] {
  return [
    {
      perfil: `${nombre}, Este perfil combina la precaución y la tranquilidad. Disfrutas de la calma al remar en aguas tranquilas. Buscas mantener el equilibrio y la estabilidad en el bote. Este perfil se centra en la coordinación y la planeación para disfrutar de una experiencia segura. Tu enfoque de inversión prioriza la preservación del capital y la seguridad por encima de la búsqueda de altos rendimientos. Tiendes a tener una baja tolerancia al riesgo y prefieres opciones de inversión más estables y seguras, incluso si esto significa que los rendimientos potenciales sean más bajos.`,
      sesgos: [
        { sesgo: 'Explicación: Los inversionistas conservadores pueden mostrar una preferencia por mantener las inversiones que ya poseen, incluso si no son las más adecuadas para su cartera. El sesgo de dotación puede llevarlos a sobrevalorar el valor de las inversiones que ya tienen en comparación con otras opciones.', asociado: 'Dotación' },
        { sesgo: 'Explicación: Los inversionistas conservadores tienden a mantener sus inversiones actuales y resisten los cambios en su cartera, incluso si existen oportunidades para mejorar su rendimiento. El sesgo de status quo puede llevarlos a evitar tomar decisiones de inversión más dinámicas.', asociado: 'Status Quo' },
        { sesgo: 'Explicación: Los inversionistas conservadores, al tener una actitud más cautelosa hacia el riesgo categorizan sus inversiones según sus objetivos financieros. Por ejemplo, podrían asignar ciertos activos a una cuenta destinada a ahorros a largo plazo, mientras que otros activos se colocan en una cuenta separada para gastos diarios o emergencias. Este sesgo puede influir en cómo gestionan sus inversiones y cómo toman decisiones financieras. Los inversionistas conservadores tienden a ser más estructurados en su enfoque y pueden resistir combinar cuentas o activos para maximizar sus rendimientos, prefiriendo mantener un enfoque más seguro y controlado.', asociado: 'Contabilidad mental' },
        { sesgo: 'Explicación: Los inversionistas conservadores tienden a basar las decisiones en valores numéricos iniciales o puntos de referencia establecidos previamente. En el contexto de inversiones, los inversionistas conservadores pueden sentirse cómodos y seguros con ciertos niveles de retorno o rendimiento que han experimentado en el pasado. Este valor o rendimiento pasado puede servir como un "ancla" para sus futuras decisiones de inversión, llevándolos a ser más cautelosos o reacios a tomar riesgos que superen ese punto de referencia establecido. Como resultado, pueden resistirse a considerar oportunidades que podrían ofrecer un rendimiento más alto si están por encima de ese anclaje, prefiriendo mantener un enfoque más conservador y evitar riesgos significativos.', asociado: 'Anclaje' },
        { sesgo: 'Explicación: Los inversionistas conservadores pueden basar sus decisiones en eventos o tendencias recientes en el mercado en lugar de considerar datos históricos más amplios. Este sesgo puede llevar a los inversionistas a ser cautelosos y reacios a tomar decisiones arriesgadas, especialmente si han experimentado pérdidas recientes o han observado periodos de volatilidad en el mercado. La historia reciente puede tener un fuerte impacto en su percepción del riesgo y en su enfoque más conservador hacia las inversiones, prefiriendo mantener una estrategia más segura y estable en lugar de aventurarse en oportunidades más arriesgadas.', asociado: 'Historia reciente' }
      ],
      respuesta: { sesgo: '', asociado: '' }
    },
    {
      perfil: `${nombre}, Este perfil combina la actitud cautelosa y exploradora. Disfrutas el conocer nuevos lugares, pero también eres consciente de los riesgos asociados. Planificas cuidadosamente tus rutas, llevando el equipo adecuado y tomando precauciones para garantizar la seguridad mientras exploras nuevos lugares en entornos montañosos. Las personas como tú buscan nuevas alternativas de inversión, manteniendo una disposición equilibrada entre el riesgo y los rendimientos esperados. Estás dispuesto a aceptar cierto grado de volatilidad en tus inversiones con el fin de lograr un mejor rendimiento.`,
      sesgos: [
        { sesgo: 'Explicación: Este sesgo se refiere a la tendencia de evitar tomar decisiones que puedan generar arrepentimiento en el futuro.<br><br>En el caso de los inversionistas moderados, esto puede manifestarse en su enfoque equilibrado hacia el riesgo, donde se busca obtener rendimientos razonables sin exponerse a riesgos excesivos. Los inversionistas moderados evitan tomar decisiones impulsivas en momentos de volatilidad en el mercado y prefieran seguir una estrategia a largo plazo. Si bien están dispuestos a asumir ciertos riesgos, también se aseguran de no exagerar y mantener un nivel de seguridad en sus inversiones.<br><br>Este sesgo puede ayudar a los inversionistas moderados a tomar decisiones más reflexivas y equilibradas, lo que les permite aprovechar oportunidades de crecimiento mientras limitan las pérdidas potenciales.', asociado: 'Aversión al remordimiento' },
        { sesgo: 'Explicación: Este sesgo se refiere a la tendencia de las personas a tener una preferencia por aquello que les resulta familiar, cómodo o cercano a sus intereses o valores.<br><br>En el caso de los inversionistas moderados, este sesgo puede influir en cómo eligen sus inversiones. Es probable que prefieran opciones de inversión que les resulten más familiares y comprensibles en lugar de aventurarse en activos más desconocidos o de mayor riesgo. Tienden a ser más cautelosos y selectivos en sus decisiones, buscando un equilibrio entre la seguridad y el crecimiento.<br><br>La afinidad puede llevar a los inversionistas moderados a sentirse más cómodos al invertir en empresas o sectores con los que están familiarizados o que se ajusten a sus valores personales. También pueden preferir mantener una cartera diversificada, pero con activos que les resulten más cercanos o que estén alineados con sus creencias.', asociado: 'Afinidad' },
        { sesgo: 'Explicación: El encuadre se refiere a cómo la información o las opciones se presentan de manera positiva o negativa, lo que puede influir en las decisiones de las personas.<br><br>En el caso de los inversionistas moderados, este sesgo puede afectar su percepción del riesgo y la recompensa de diferentes opciones de inversión. Si una oportunidad de inversión se presenta de manera positiva, resaltando sus posibles beneficios y oportunidades de crecimiento, los inversionistas moderados pueden sentirse más inclinados a considerarla y tomarla en cuenta. Por otro lado, si una inversión se presenta de manera negativa, enfatizando los posibles riesgos y desventajas, los inversionistas moderados pueden ser más cautelosos y reacios a considerarla en su estrategia de inversión.<br><br>El sesgo de encuadre puede llevar a los inversionistas moderados a ser más sensibles a cómo se presentan las opciones y a buscar un equilibrio entre oportunidades de crecimiento y la protección de su capital. Esto puede influir en cómo construyen y ajustan sus inversiones, buscando mantener un enfoque más equilibrado y consciente de los riesgos.', asociado: 'Encuandre' },
        { sesgo: 'Explicación: La retrospectiva, también conocida como "sesgo de la falacia del conocimiento después del hecho", se refiere a la tendencia de las personas a ver eventos pasados como más predecibles de lo que realmente eran, una vez que conocen el resultado.<br><br>En el caso de los inversionistas moderados, este sesgo puede influir en cómo perciben sus decisiones pasadas en el mercado. Después de que una inversión ha tenido éxito, pueden creer que su decisión fue más acertada y predecible de lo que realmente fue. Del mismo modo, si una inversión resulta en pérdidas, pueden sentir que deberían haber anticipado el resultado negativo.<br><br>Este sesgo puede llevar a los inversionistas a tener una visión distorsionada de sus habilidades para tomar decisiones financieras y evaluar los riesgos. Pueden sentirse más seguros o sobreestimar sus capacidades después de un resultado positivo y más críticos o dudar de sí mismos después de un resultado negativo.', asociado: 'Retrospectiva' }
      ],
      respuesta: { sesgo: '', asociado: '' }
    },
    {
      perfil: `${nombre}, Este perfil combina el enfoque cambiante y la capacidad de adaptación. Al igual que en el ciclismo de carretera, te aventuras a diferentes tipos de terreno, enfrentando desafíos más intensos. Disfrutas de la emoción de recorrer largas distancias; la velocidad y resistencia dependen de las condiciones las cuales pueden ser cambiantes, como el clima o el tráfico. Como inversionista, estás dispuesto a tomar mayores riesgos en busca de mejorar tus rentabilidades, tienes una actitud más audaz hacia la inversión. Buscas que las inversiones crezcan con el tiempo y entiendes que los rendimientos a menudo requieren de paciencia.`,
      sesgos: [
        { sesgo: 'En este perfil, el sesgo de autocontrol puede estar relacionado con la capacidad de manejar emociones y mantener un enfoque equilibrado en sus decisiones financieras, a pesar de estar dispuestos a asumir riesgos más elevados en busca de mayores rendimientos.<br><br>Aunque los inversionistas moderados-agresivos están dispuestos a tomar ciertos riesgos, el sesgo de autocontrol les ayuda a evitar decisiones impulsivas o excesivamente arriesgadas. Pueden mantener una visión más objetiva al evaluar oportunidades de inversión y considerar detenidamente los pros y contras antes de tomar decisiones.<br><br>El sesgo de autocontrol también puede manifestarse en su habilidad para mantener una cartera diversificada y reequilibrarla de manera sistemática, evitando que la emoción o la euforia los lleve a una concentración excesiva en activos de alto riesgo.', asociado: 'Autocontrol' },
        { sesgo: 'Explicación: Este sesgo se refiere a la incomodidad o tensión que experimenta una persona cuando sus creencias o actitudes no están alineadas con sus acciones. En el caso de los inversionistas moderados-agresivos, esto podría ocurrir cuando enfrentan información o evidencia que contradice sus creencias sobre sus decisiones financieras más arriesgadas.<br><br>Los inversionistas están dispuestos a asumir ciertos riesgos en busca de mayores rendimientos, pero también pueden experimentar disonancia cognitiva cuando enfrentan resultados inesperados o pérdidas en esas inversiones más arriesgadas. Podrían enfrentar una tensión interna entre su deseo de obtener mayores ganancias y el temor a la posibilidad de pérdidas significativas.<br><br>Para reducir esta disonancia cognitiva, los inversionistas podrían revisar sus creencias y justificar sus decisiones, lo que podría influir en su comportamiento financiero. Podrían racionalizar que las pérdidas son parte del proceso de inversión y mantener su enfoque en buscar oportunidades emocionantes y con mayores potenciales de crecimiento.', asociado: 'Disonancia cognitiva' },
        { sesgo: 'Explicación: Este sesgo se refiere a la tendencia de las personas a atribuir los resultados positivos de sus decisiones a sus habilidades personales o aciertos propios, mientras que las pérdidas o resultados negativos los atribuyen a factores externos o circunstancias fuera de su control.<br><br>En el caso de los inversionistas moderados-agresivos, este sesgo puede influir en cómo interpretan y procesan los resultados de sus inversiones. Si obtienen rendimientos positivos en sus inversiones arriesgadas, pueden atribuirlo a su habilidad para identificar oportunidades o tomar decisiones financieras acertadas. Por otro lado, si experimentan pérdidas, pueden culpar a factores externos como la volatilidad del mercado o eventos imprevistos.<br><br>Este sesgo puede llevar a tener una visión sesgada de las habilidades y juicios financieros. Pueden sentirse más seguros y optimistas sobre sus decisiones, lo que podría llevarlos a tomar riesgos adicionales sin evaluar completamente los riesgos involucrados.', asociado: 'Auto atribución' }
      ],
      respuesta: { sesgo: '', asociado: '' }
    },
    {
      perfil: `${nombre}, Este perfil combina la audacia y la competitividad. Al igual que en el surf, buscas emociones fuertes y desafíos en las olas. Disfrutas de la sensación de libertad y adrenalina al montarlas. Tú actitud y estrategia priorizan la búsqueda de rendimientos más altos a través de la inversión en activos o estrategias que conllevan un mayor grado de riesgo. Estas dispuesto a asumir riesgos significativos en busca de mayores oportunidades de crecimiento, incluso si eso implica la posibilidad de pérdidas considerables en el camino.`,
      sesgos: [
        { sesgo: 'Este sesgo se refiere a la tendencia de las personas a sobreestimar sus habilidades, conocimientos para tomar decisiones financieras. Los inversionistas que exhiben este sesgo tienden a tener una confianza excesiva en sus capacidades, lo que puede llevarlos a tomar riesgos más grandes de lo que sería prudente o a subestimar los riesgos asociados con ciertas inversiones.<br><br>En el caso de los inversionistas arriesgados, este sesgo puede manifestarse en su creencia de que tienen una habilidad superior para identificar oportunidades de inversión y superar al mercado. Pueden sentirse seguros de que pueden obtener rendimientos excepcionales y superar a otros inversionistas debido a su disposición a asumir mayores riesgos.<br><br>Esta confianza excesiva puede llevarlos a tomar decisiones impulsivas basadas en esa creencia en lugar de realizar un análisis más objetivo. Pueden subestimar los posibles riesgos y no evaluar completamente los datos y las tendencias del mercado antes de tomar decisiones.', asociado: 'Exceso de confianza' },
        { sesgo: 'Explicación: Este sesgo se refiere a la tendencia de las personas a basar sus decisiones en patrones o creencias establecidas por experiencias pasadas o situaciones particulares, en lugar de considerar datos o probabilidades más objetivas.<br><br>En el caso de los inversionistas arriesgados, este sesgo puede influir en cómo perciben y evalúan oportunidades de inversión. Pueden ser propensos a ver patrones o similitudes en ciertas inversiones o activos, lo que puede llevarlos a tomar decisiones basadas en comparaciones con situaciones anteriores, en lugar de analizar datos objetivos. Por ejemplo, si un inversionista arriesgado ha tenido éxito en invertir en un sector específico en el pasado, es más probable que busque oportunidades similares en el futuro, basándose en la representatividad de esa experiencia pasada.<br><br>Este sesgo puede llevar a los inversionistas a asumir riesgos innecesarios o a no considerar completamente la diversificación de sus inversiones. Pueden confiar demasiado en su intuición o en comparaciones con eventos pasados, en lugar de evaluar adecuadamente los riesgos y recompensas potenciales.', asociado: 'Representatividad' },
        { sesgo: 'Explicación: Este sesgo se refiere a la tendencia de las personas a buscar, interpretar o dar más importancia a la información que confirma sus creencias o puntos de vista existentes, mientras ignoran o minimizan información que contradice esas creencias.<br><br>En el caso de los inversionistas arriesgados, este sesgo puede influir en cómo procesan la información relacionada con sus decisiones financieras. Debido a su disposición a asumir mayores riesgos, los inversionistas arriesgados pueden buscar información que respalde su enfoque de inversiones más audaz y buscar confirmación de que sus decisiones son acertadas.<br><br>Pueden dar más peso a análisis o noticias que respalden la rentabilidad potencial de ciertas inversiones de alto riesgo, mientras descartan o minimizan datos que sugieran mayores riesgos o volatilidad.<br><br>Este sesgo puede llevar a los inversionistas a concentrarse demasiado en activos o sectores específicos que encajen con sus creencias y estrategias de inversión, en lugar de considerar una gama más amplia de oportunidades.', asociado: 'Exceso de confirmación' },
        { sesgo: 'Explicación: El sesgo de conservación puede parecer contradictorio con el perfil arriesgado de inversionistas, pero también puede manifestarse en este tipo de perfil de manera particular.<br><br>Aunque los inversionistas arriesgados son conocidos por su disposición a asumir riesgos y buscar oportunidades de alto rendimiento, también pueden tener ciertos comportamientos que se ajusten al sesgo de exceso de conservación en ciertas situaciones. Por ejemplo, puede manifestarse cuando se enfrentan pérdidas significativas en las inversiones. En lugar de tomar riesgos adicionales para recuperar las pérdidas, pueden volverse más cautelosos y reacios a asumir más riesgos en el futuro.<br><br>Es importante que los inversionistas arriesgados reconozcan y gestionen este sesgo. Aunque su enfoque principal sea el de tomar riesgos calculados, deben estar preparados para enfrentar las pérdidas y evitar caer en la trampa del exceso de conservación. Mantener un enfoque equilibrado, diversificar adecuadamente la cartera y reevaluar periódicamente las estrategias de inversión les permitirá aprovechar oportunidades de alto rendimiento sin comprometer una gestión adecuada de riesgos.', asociado: 'Conservación' },
        { sesgo: 'Explicación: Este sesgo se refiere a la tendencia de las personas a creer que tienen más control sobre los resultados de una situación de lo que realmente tienen.<br><br>En el caso de los inversionistas arriesgados, este sesgo puede manifestarse en su percepción de que su habilidad o conocimiento les permite tener un mayor control sobre el rendimiento de sus inversiones de alto riesgo. Pueden sentir que sus decisiones y estrategias influyen significativamente en los resultados y que pueden prever y controlar los movimientos del mercado de manera más precisa.<br><br>Este sesgo puede llevar a los inversionistas a tomar decisiones más activas y asumir riesgos adicionales, basados en una falsa sensación de control. Pueden sobreestimar su capacidad para prever tendencias y eventos futuros, lo que podría llevarlos a tomar decisiones impulsivas y asumir mayores riesgos basados en una percepción exagerada de su control sobre el mercado.<br><br>Si bien la investigación y la toma de decisiones informadas son fundamentales, también se debe reconocer que el mercado puede ser impredecible y que hay factores externos que están más allá de su control.', asociado: 'Ilusión de control' }
      ],
      respuesta: { sesgo: '', asociado: '' }
    },
];}


  puntajeTotal: number = 0;

  preguntaActual: any;
  perfilActual:any;

  preguntasInicialesAceptadas: boolean = false;
  preguntasInicialesMostradas: boolean = false;
  observoVideo: boolean = true;
  muestraPerfil: boolean = false;
  muestraSesgos: boolean = false;

  sesgoSeleccionadoIndex: number = -1;

  progressPercentage: number = 0;
  preguntaActualIndex: number = 0;

  preguntasInicialesCompletas(): boolean {
    const valor: boolean = this.validaDatosCompleto();
    return valor;
  }

  validaDatosCompleto(): boolean {
    if(this.formulario.value.nombre != '' && this.formulario.value.edad != '' && this.formulario.value.estadoCivil != '' && this.formulario.value.nivelAcademico != '' && this.formulario.value.sexo != '' && this.formulario.value.encuestaAnterior != '' && this.formulario.value.perfilAnterior != '' && this.formulario.value.aceptaTratamientoDatos != false){
      return true;
    }else{
      return false;
    }

  }

  enviarDatosSheet(){

    let arreglo = [this.formulario.value.nombre, this.formulario.value.edad, this.formulario.value.sexo, this.formulario.value.encuestaAnterior, this.formulario.value.perfilAnterior, this.formulario.value.nivelAcademico, this.formulario.value.estadoCivil,this.formulario.value.aceptaTratamientoDatos, this.perfil, this.puntajeTotal];
    let datos = this.enviarDatos(arreglo);
    console.log(datos);
  }

  verificarAutorizacion() {

    let aceptaTratamiento = this.formulario.value.aceptaTratamientoDatos ?? false;
    if (aceptaTratamiento) {
      this.preguntasInicialesAceptadas = true;
      this.preguntasInicialesMostradas = true;
      this.mostrarPregunta();
    } else {
      alert('Debe aceptar el tratamiento de datos para continuar.');
    }
  }

  mostrarPregunta() {
    if (!this.preguntasInicialesMostradas) {
      console.log(this.preguntasInicialesMostradas);
    } else if (this.preguntas.some(pregunta => pregunta.respuesta.respuesta === '')) {
      this.preguntaActual = this.preguntas.find(pregunta => pregunta.respuesta.respuesta === '');
    } else {
      this.preguntaActual = null;
    }
  }

  siguientePregunta(respuestaPuntaje: any) {
    for (let i = 0; i < this.preguntaActual.opciones.length; i++) {
      if (respuestaPuntaje == this.preguntaActual.opciones[i].respuesta) {
        this.puntajeTotal += this.preguntaActual.opciones[i].puntaje;
      }
    }
    this.calcularPerfil();
  
    if (this.preguntaActual) {
      this.preguntaActual.respuesta = this.preguntaActual.respuesta || 'No respondida';
      this.mostrarPregunta();
    }

    if (this.preguntaActualIndex < this.preguntas.length - 1) {
      this.preguntaActualIndex++;
    }else{
      this.preguntaActualIndex++;
    }
    // Calcular el progreso en porcentaje y actualizar progressPercentage
    this.progressPercentage = (this.preguntaActualIndex + 1) / this.preguntas.length * 100;
    console.log(this.preguntaActualIndex);
    if(this.preguntaActualIndex == 7){

      this.observoVideo = false;
      this.enviarDatosSheet();
      //this.sendData();

    }
  }

  mostrarPerfil(){

    //this.preguntasInicialesAceptadas = false;
    this.observoVideo = true;
    this.muestraPerfil = true;

  }

  mostrarSesgo(sesgo:any, index: number){
    this.ngZone.run(() => {
      sesgo.mostrar = !sesgo.mostrar;
  
      if (sesgo.mostrar) {
        this.sesgoSeleccionadoIndex = index;
      } else {
        this.sesgoSeleccionadoIndex = -1;
      }
    });
  }

  mostrarSesgos(){
    this.muestraSesgos = true;
    this.muestraPerfil = false;
  }

  calcularPerfil(){

    if(this.puntajeTotal >= 7 && this.puntajeTotal<= 13){
      this.perfil = 'Conservador';
      this.perfilUsuario = 'Cuidadoso - Remo en aguas tranquilas';
      this.perfilActual = this.perfilFinal[0];
    }else if(this.puntajeTotal >= 14 && this.puntajeTotal <= 20){
      this.perfil = 'Moderado';
      this.perfilUsuario = 'Explorador - Senderismo en montaña';
      this.perfilActual = this.perfilFinal[1];
    }else if(this.puntajeTotal >= 21 && this.puntajeTotal <= 24){
      this.perfil = 'Moderado-Agresivo';
      this.perfilUsuario = 'Versátil - Ciclismo de carretera';
      this.perfilActual = this.perfilFinal[2];
    }else if(this.puntajeTotal >= 25 && this.puntajeTotal <= 28){
      this.perfil = 'Arriesgado';
      this.perfilUsuario = 'Competitivo - Surf';
      this.perfilActual = this.perfilFinal[3];
    }
  }

}