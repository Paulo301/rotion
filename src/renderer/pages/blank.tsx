import { Link } from "react-router-dom";

export function Blank() {
  return (
    <main className='flex-1 flex items-center justify-center text-rotion-400'>
      Seleciona ou crie um documento

      <Link to="/document">Acessar documento</Link>
    </main>
  );
}