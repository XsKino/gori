'use client'
import DND from '@/components/Dnd'
import { useEffect } from 'react'
function Page() {
  useEffect(() => {}, [])

  const data = [
    {
      type: 'IA',
      name: 'The fokin IA',
      text: 'Bienvenidos, valientes aventureros, a un reino donde la magia danza en el aire como hojas al viento y los secretos ancestrales yacen enterrados en las profundidades de la historia. Os encuentráis en Eldoria, un mundo lleno de maravillas y peligros, donde cada rincón está impregnado de la esencia mágica que fluye desde tiempos inmemoriales.Eldoria se extiende desde las cumbres nevadas de las Montañas Heladas hasta las vastas llanuras de la Tierra de las Llamas Eternas. En sus bosques antiguos, criaturas místicas danzan entre los árboles, mientras que en las ciudades y pueblos, diversas razas comercian, conspiran y forjan destinos entrelazados.En el corazón de este reino, la Ciudad de los Sabios se alza como un faro de conocimiento, con su imponente torre que se pierde entre las nubes. Es aquí donde los aprendices de la magia buscan desentrañar los misterios arcanos que dan forma al tejido mismo de la realidad.Pero Eldoria no es solo un lugar de asombro y descubrimiento. En las sombras se esconden malevolencias ancestrales, y el eco de antiguas profecías resuena en los vientos. El destino de Eldoria yace en manos de aquellos lo suficientemente valientes para desafiar las oscuras fuerzas que amenazan con desequilibrar la armonía mágica que sustenta el mundo.Así que, aventureros, preparad vuestros sentidos y afilad vuestras habilidades, porque en Eldoria, la magia, la intriga y la aventura os aguardan en cada esquina. ¿Estáis listos para forjar vuestra propia leyenda en este reino de maravillas y peligros? ¡Que comience la historia!'
    },
    {
      type: 'Player',
      name: 'Kino',
      text: 'Saludos, viajero del reino de las palabras. Soy Kino, un mago de tierras lejanas y secretos profundos. En los recovecos misteriosos de Eldoria, mi historia se teje con hebras de magia ancestral y conocimiento arcano Desde mi juventud, la magia fluyó a través de mí como un río incontenible. Nací en una aldea envuelta en el misterio, donde los sabios ancianos reconocieron mi conexión especial con los hilos invisibles que sostienen el universo. En la torre de los aprendices, desentrañé los secretos de los grimorios antiguos y forjé mi camino hacia la maestría en las artes arcanas. Con barba plateada y túnica azul oscuro, me aventuré más allá de las murallas de la torre, ansioso por explorar el vasto mundo que se extendía ante mí. Mi bastón, tallado con runas antiguas, se convirtió en mi compañero constante en esta odisea de descubrimiento y aventura. Mis hechizos abarcan el espectro completo de la magia: desde curativas caricias de vitalidad hasta temblorosos conjuros destructivos. Pero mi verdadera fuerza radica en la comprensión profunda de las conexiones mágicas que entrelazan la realidad misma. Veo más allá de lo visible, percibo la danza de la magia que fluye en cada rincón del mundo. Mi peregrinaje ha sido largo, lleno de desafíos y encuentros con criaturas místicas. Sin embargo, cada paso me acerca más a la esencia misma de la magia, a la comprensión íntima de su papel en la creación y el equilibrio del universo. Soy Kino, el mago errante, tejedor de maravillas y protector de los secretos arcanos. Donde mis pasos me lleven, la magia susurra mi nombre, y mi leyenda se entrelaza con los elementos mismos que dan forma a nuestra realidad. ¡Acompáñame en este viaje, y descubramos juntos los misterios que aguardan en las sombras de Eldoria!'
    },
    {
      type: 'IA',
      name: 'And you know',
      text: 'im hurting i have a lot of pain in my heart and i dont know what to do with it'
    },
    {
      type: 'Player',
      name: 'Sasinet',
      text: 'soy sasinet y vengo a ganar el hack'
    },
    {
      type: 'roll',
      roll: 'El usuario Sasinet ha sacado un 20 en su tirada de dados'
    }
  ]
  return (
    <div>
      <DND
        data={data}
        SendB={false}
        RollB={true}
        backgroundImage={'https://res.cloudinary.com/djtsesvfs/image/upload/v1699264074/SMB/boo.png'}
        disabled={false}
      />
    </div>
  )
}
export default Page
