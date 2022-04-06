interface Props {
  name: string | null;
  restart(): void;
}
const Finished = (props: Props) => {
  const { name, restart } = props;
  return (
    <div>
      <h1>
        {name && `Jugador ${name} gano el juego`}
        {!name && "Es un Empate"}
      </h1>
      <button onClick={restart}>Reiniciar</button>
    </div>
  );
};
export default Finished;
