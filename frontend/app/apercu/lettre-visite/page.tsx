import { redirect } from 'next/navigation';

// L'ancienne maquette de travail : le numéro se compose maintenant dans le back-office et se lit à cette adresse.
export default function LettreVisite() {
  redirect('/lettre/numero-1');
}
