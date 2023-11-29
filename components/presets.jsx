import { Divider, Listbox, ListboxItem, Progress } from "@nextui-org/react";
import { useState, useEffect } from "react";
import veneno from "@/public/music/1.mp3";
import perdido from "@/public/music/2.mp3";
import mago from "@/public/music/3.mp3";
import cosmic from "@/public/music/4.mp3";

const Page = () => {
  const [pressedButton, setPressedButton] = useState(null);
  const [audio, setAudio] = useState({
    veneno: null,
    perdido: null,
    mago: null,
    cosmic: null,
  });
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    setAudio({
      veneno: new Audio(veneno),
      perdido: new Audio(perdido),
      mago: new Audio(mago),
      cosmic: new Audio(cosmic),
    });
  }, []);

  useEffect(() => {
    playAudio("veneno");
  }, [audio]);

  const playAudio = (track) => {
    if (currentTrack && audio[currentTrack]) {
      audio[currentTrack].pause();
      audio[currentTrack].currentTime = 0;
    }
    if (audio[track]) {
      audio[track].play();
      setCurrentTrack(track);
    }
  };

  const [difficulty, setDifficulty] = useState("easy");
  const [currentAction, setCurrentAction] = useState("Descripcion");
  const difficultySettings = getDifficultySettings(difficulty);
  const characters = [
    {
      gender: "La",
      name: "Medica de la peste",
      editable_name: "Dani",
      mundo:
        "La Médica de la Peste se desenvuelve en un mundo asolado por una enfermedad mágica, donde la peste no solo afecta al cuerpo, sino también al tejido mismo de la realidad. Ciudades desiertas y paisajes distorsionados conforman este reino enfermo, donde criaturas de pesadilla acechan en las sombras. Antiguos conocimientos sobre magia y curación se entrelazan con la desesperación de una población que lucha por sobrevivir.",
      objetivo:
        "La Médica de la Peste, conocida como Dani en círculos más íntimos, se embarca en una misión ardua y vital: descubrir la fuente de la enfermedad mágica que devasta su mundo y encontrar una cura para restaurar la salud y el equilibrio. Su viaje la llevará a través de tierras distorsionadas y a la confrontación con entidades oscuras que manipulan los hilos de la realidad. En su búsqueda, Dani deberá enfrentarse a decisiones éticas difíciles y desentrañar antiguos secretos para salvar a su mundo de la ruina.",
      quote:
        "En la sombra de la enfermedad, encuentro la luz de la curación. Con máscara en rostro y valentía en corazón, enfrento la peste con la determinación de sanar y restaurar la esperanza.",
      description:
        "La Médica de la Peste es una figura enigmática y cautivadora que se presenta con un atuendo distintivo, caracterizado por una túnica larga y ajustada, a menudo de color negro o verde oscuro. Su vestimenta incluye una máscara facial con forma de pico alargado, similar a las utilizadas durante la época de la peste bubónica en la Europa medieval. Esta máscara no solo sirve como protección contra enfermedades, sino que también añade un toque misterioso a su presencia.",
    },
    {
      gender: "El",
      name: "Desterrado",
      editable_name: "Kino",
      mundo:
        "Kino, El Desterrado, deambula por un reino decadente y desolado, donde antiguas ruinas y sombras olvidadas cuentan la historia de una civilización caída. Este mundo está lleno de paisajes melancólicos, ciudades en ruinas y bosques silenciosos que guardan secretos olvidados. Criaturas místicas vagan entre las sombras, testigos silentes del pasado glorioso que ahora yace en escombros.",
      objetivo:
        "El objetivo de Kino, El Desterrado, es encontrar redención y reconciliación con su pasado. Busca respuestas sobre por qué fue desterrado y anhela restaurar un sentido de pertenencia en un mundo que alguna vez llamó hogar. Su viaje lo llevará a través de tierras inhóspitas y a enfrentarse a los fantasmas de su pasado, descubriendo verdades ocultas que podrían cambiar el destino de su existencia errante. En este viaje de autodescubrimiento, Kino buscará encontrar un lugar donde pueda reconstruir su vida y encontrar un propósito perdido.",
      quote:
        "Errante entre sombras, desterrado de mi pasado. Cada paso es un eco de lo que fui, una búsqueda eterna de un refugio que ya no existe.",
      description:
        "El Desterrado es un alma errante, marcada por la soledad y la nostalgia. Su figura, envuelta en harapos, camina con la carga de un pasado oscuro y la ausencia de un hogar. Su mirada perdida refleja la tristeza de haber sido expulsado de lo conocido.",
    },
    {
      gender: "El",
      name: "Mago traicionado",
      mundo:
        "Polo, El Mago Traicionado, se desenvuelve en un reino de magia y intriga, donde las líneas entre la luz y la oscuridad son borrosas. Este mundo mágico está lleno de academias arcanas, antiguos bosques encantados y ciudades donde la magia es una fuerza tangible en la vida cotidiana. Sin embargo, también es un lugar donde las alianzas cambian rápidamente, y la traición acecha en cada esquina.",
      objetivo:
        "El objetivo de Polo, El Mago Traicionado, es desentrañar los hilos de la traición que lo han marcado. Busca descubrir la verdad detrás de las traiciones pasadas y deshacer las cicatrices mágicas que lo atormentan. Su viaje lo llevará a través de paisajes encantados y a la confrontación con antiguos colegas que se volvieron en su contra. En su búsqueda de redención, Polo deberá decidir si puede confiar nuevamente en el mundo de la magia o si su destino está sellado por las sombras del engaño.",
      editable_name: "Polo",
      quote:
        "En los libros de hechicería, aprendí el arte de confiar. En las cicatrices de mis manos, llevo la lección amarga de la traición. La magia es mi aliada, pero la confianza, mi eterna prueba.",
      description:
        "El Mago Traicionado lleva consigo la marca de la desilusión en cada gesto. Vestido con túnicas desgarradas y cabello desordenado, su semblante revela la carga de haber confiado demasiado. Cicatrices mágicas adornan sus manos, recordando traiciones pasadas que lo han dejado marcado tanto física como emocionalmente.",
    },
    {
      gender: "La",
      name: "Alma perdida",
      mundo:
        "Lucy, La Alma Perdida, deambula por los reinos más allá de la comprensión humana, gobernados por los Grandes Antiguos. Este mundo cósmico es un laberinto de dimensiones entrelazadas, donde las leyes de la realidad son torcidas y los horizontes se desvanecen en la oscuridad. Criaturas indescriptibles y arquitecturas alienígenas pueblan este reino, mientras los susurros de los antiguos reverberan en el vacío cósmico.",
      objetivo:
        "El objetivo de Lucy, La Alma Perdida, es encontrar un equilibrio en medio de la vastedad y complejidad de los reinos gobernados por los Grandes Antiguos. Busca comprender su propia existencia en este cosmos caótico y descubrir un propósito que dé sentido a su vagar entre dimensiones. Su viaje la llevará a enfrentarse a entidades cósmicas y a desentrañar secretos ancestrales que podrían tener consecuencias para la realidad misma. En su búsqueda de identidad y significado, Lucy se convierte en una testigo silente de los misterios que yacen más allá de la comprensión humana.",
      editable_name: "Lucy",
      quote:
        "Entre los susurros de los Grandes Antiguos, mi alma se pierde en el laberinto del cosmos. Soy testigo de secretos que desafían la razón, una esencia perdida en la sinfonía insondable de los universos",
      description:
        "La Alma Perdida en el Mundo Gobernado por los Grandes Antiguos vaga entre dimensiones olvidadas. Su presencia está envuelta en una bruma etérea, y su mirada refleja la incomprehensión de los secretos cósmicos. Sus contornos parecen difuminarse entre las sombras, testigos de la vastedad y la insondable complejidad de los reinos más allá de la comprensión humana.",
    },
  ];
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const currentCharacter = characters[currentCharacterIndex];

  function getDifficultySettings(difficulty) {
    switch (difficulty) {
      case "easy":
        return {
          value: 25,
          indicator: "bg-gradient-to-r from-green-500 to-yellow-500",
        };
      case "medium":
        return {
          value: 50,
          indicator: "bg-gradient-to-r from-yellow-500 to-orange-500",
        };
      case "hard":
        return {
          value: 75,
          indicator: "bg-gradient-to-r from-orange-500 to-red-500",
        };
      case "very hard":
        return {
          value: 100,
          indicator: "bg-gradient-to-r from-red-500 to-purple-500",
        };
      default:
        return { value: 0, indicator: "bg-gray-500" };
    }
  }
  return (
    <div
      className={
        pressedButton === 1
          ? "min-h-screen flex flex-col relative bg-gradient-to-b from-black to-green-900"
          : pressedButton === 2
          ? "min-h-screen flex flex-col relative bg-gradient-to-b from-black to-amber-900"
          : pressedButton === 3
          ? "min-h-screen flex flex-col relative bg-gradient-to-b from-black to-red-900"
          : pressedButton === 4
          ? "min-h-screen flex flex-col relative bg-gradient-to-b from-black to-purple-900"
          : "min-h-screen flex flex-col relative bg-gradient-to-b from-black to-green-900 "
      }
    >
      <div className="absolute top-0 right-0 m-4 text-right">
        <div className="flex items-end justify-end">
          <div className="text-2xl font-bold text-yellow-300 pr-2 mb-6">
            {currentCharacter.gender}
          </div>
          <div className="text-5xl font-bold text-yellow-300 ">
            {currentCharacter.name}
          </div>
        </div>
        <div className="text-3xl mt-3">{currentCharacter.editable_name}</div>
        <div className="flex items-center mt-3">
          <div className="mr-2 text-2xl">Dificultad:</div>
          <Progress
            size="lg"
            value={difficultySettings.value}
            classNames={{
              base: "max-w-md",
              indicator: difficultySettings.indicator,
            }}
          />
        </div>
        <Divider className="my-2 h-2 rounded-lg" />
        <div className="flex">
          <div className="max-w-[600px] flex items-center justify-center text-center mt-5">
            <div className="writing-mode-vertical-rl">
              {(() => {
                switch (currentAction) {
                  case "Descripcion":
                    return (
                      <div>
                        <i className="text-lg">{currentCharacter.quote}</i>
                        <p className="mt-5 text-left">
                          {currentCharacter.description}
                        </p>
                        <p className="mt-5">¿Poner luego estadisticas?</p>
                      </div>
                    );
                  case "Mundo":
                    return <p> {currentCharacter.mundo}</p>;
                  case "Objetivo":
                    return <p> {currentCharacter.objetivo}</p>;
                  default:
                    return null;
                }
              })()}
            </div>
            <div className="w-auto flex justify-end">
              <Listbox
                variant={"shadow"}
                onAction={(key) => setCurrentAction(key)}
              >
                <ListboxItem key="Descripcion">Descripcion</ListboxItem>
                <ListboxItem key="Mundo">Mundo</ListboxItem>
                <ListboxItem key="Objetivo">Objetivo</ListboxItem>
                <ListboxItem
                  key="delete"
                  color={"warning"}
                  className="text-warning"
                >
                  Jugar
                </ListboxItem>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-end absolute bottom-0 w-full mb-10">
        <button
          onClick={() => {
            setDifficulty("easy");
            setCurrentCharacterIndex(0);
            setPressedButton(1);
            playAudio("veneno");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded transform rotate-45 mx-3"
        >
          1
        </button>
        <button
          onClick={() => {
            setDifficulty("medium");
            setCurrentCharacterIndex(1);
            setPressedButton(2);
            playAudio("perdido");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded transform rotate-45 mx-3"
        >
          2
        </button>
        <button
          onClick={() => {
            setDifficulty("hard");
            setCurrentCharacterIndex(2);
            setPressedButton(3);
            playAudio("mago");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded transform rotate-45 mx-3"
        >
          3
        </button>
        <button
          onClick={() => {
            setDifficulty("very hard");
            playAudio("cosmic");
            setCurrentCharacterIndex(3);
            setPressedButton(4);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded transform rotate-45 mx-3"
        >
          4
        </button>
      </div>
    </div>
  );
};

export default Page;
