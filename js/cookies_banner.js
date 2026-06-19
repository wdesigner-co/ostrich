/* ==========================================
COOKIE CONSENT
========================================== */

/*
|--------------------------------------------------------------------------
| Referencias a elementos del DOM
|--------------------------------------------------------------------------
*/

const cookieBanner =
  document.getElementById(
    "cookieBanner"
  );

const cookieSettings =
  document.getElementById(
    "cookieSettings"
  );

/*
|--------------------------------------------------------------------------
| Configuración
|--------------------------------------------------------------------------
|
| 48 horas en milisegundos
|
*/

const FORTY_EIGHT_HOURS =
  48 * 60 * 60 * 1000;

/*
|--------------------------------------------------------------------------
| Obtener consentimiento guardado
|--------------------------------------------------------------------------
*/

const consent =
  JSON.parse(
    localStorage.getItem(
      "ostrich-cookie-consent"
    )
  );

/*
|--------------------------------------------------------------------------
| Mostrar u ocultar banner
|--------------------------------------------------------------------------
|
| Si no existe consentimiento:
|   -> Mostrar banner
|
| Si existe:
|   -> Revisar si han pasado 48 horas
|      - Si NO han pasado:
|          ocultar banner
|      - Si ya expiró:
|          eliminar consentimiento
|          mostrar banner nuevamente
|
*/

if (!consent) {

  cookieBanner.style.display =
    "flex";

} else {

  const expired =

    Date.now() -
    consent.timestamp >

    FORTY_EIGHT_HOURS;

  if (expired) {

    localStorage.removeItem(
      "ostrich-cookie-consent"
    );

    cookieBanner.style.display =
      "flex";

  } else {

    cookieBanner.remove();

    if (cookieSettings) {

      cookieSettings.remove();
    }
  }
}

/*
|--------------------------------------------------------------------------
| Guardar preferencias
|--------------------------------------------------------------------------
|
| Se reutiliza para:
| - Aceptar todas
| - Rechazar no esenciales
| - Configuración personalizada
|
| También guarda la fecha para
| controlar la expiración.
|
*/

function saveCookieConsent(
  settings
) {

  localStorage.setItem(

    "ostrich-cookie-consent",

    JSON.stringify({

      ...settings,

      timestamp:
        Date.now()

    })
  );
}

/*
|--------------------------------------------------------------------------
| Abrir / cerrar panel de configuración
|--------------------------------------------------------------------------
*/

document
  .getElementById(
    "cookieSettingsBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      cookieSettings
        ?.classList
        .toggle("show");

    }
  );

/*
|--------------------------------------------------------------------------
| Aceptar todas las cookies
|--------------------------------------------------------------------------
*/

document
  .getElementById(
    "cookieAcceptBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      saveCookieConsent({

        essential: true,

        functional: true,

        marketing: true

      });

      cookieBanner.remove();

      cookieSettings?.remove();

    }
  );

/*
|--------------------------------------------------------------------------
| Rechazar cookies no esenciales
|--------------------------------------------------------------------------
|
| Solo permanecen activas
| las cookies necesarias.
|
*/

document
  .getElementById(
    "cookieRejectBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      saveCookieConsent({

        essential: true,

        functional: false,

        marketing: false

      });

      cookieBanner.remove();

      cookieSettings?.remove();

    }
  );

/*
|--------------------------------------------------------------------------
| Guardar preferencias personalizadas
|--------------------------------------------------------------------------
|
| Lee los checkboxes de:
| - Funcionalidad
| - Marketing
|
*/

document
  .getElementById(
    "saveCookiePreferences"
  )
  ?.addEventListener(
    "click",
    () => {

      saveCookieConsent({

        essential: true,

        functional:
          document.getElementById(
            "functionalCookies"
          ).checked,

        marketing:
          document.getElementById(
            "marketingCookies"
          ).checked

      });

      cookieBanner.remove();

      cookieSettings?.remove();

    }
  );