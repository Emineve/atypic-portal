import { redirect } from 'next/navigation';

// Cette page est désormais intégrée à la charte
export default function Page() {
  redirect('/charte#classement');
}
