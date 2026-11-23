'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AlertBand, { ALERT_BUTTON } from './AlertBand';
import { hasAlert, isSearching } from '../lib/intent';

// La carte « Créer une alerte », affichée au bon moment : quand le visiteur a montré qu'il cherche
// (favori, demande à une agence, plusieurs biens consultés, ou `signal` donné par la page), et
// seulement s'il n'a pas déjà d'alerte. Sinon rien, ou `fallback` si la page en fournit un.
export default function SmartAlert({
  signal = false,
  tick,
  onOpen,
  extra,
  fallback = null,
  className = '',
  wrapperClassName,
}: {
  signal?: boolean;
  tick?: unknown; // change quand la page veut faire recalculer l'affichage
  onOpen?: () => void;
  extra?: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => setShow(!hasAlert() && (signal || isSearching()));
    check();
    window.addEventListener('focus', check);
    window.addEventListener('pageshow', check);
    return () => {
      window.removeEventListener('focus', check);
      window.removeEventListener('pageshow', check);
    };
  }, [signal, tick]);

  if (!show) return <>{fallback}</>;
  const band = (
    <AlertBand title="Soyez le premier à recevoir les annonces de biens atypiques." extra={extra} className={className}>
      {onOpen ? (
        <button type="button" onClick={onOpen} className={ALERT_BUTTON}>
          Créer mon alerte
        </button>
      ) : (
        <Link href="/?alerte=1" className={ALERT_BUTTON}>
          Créer mon alerte
        </Link>
      )}
    </AlertBand>
  );
  return wrapperClassName ? <div className={wrapperClassName}>{band}</div> : band;
}
