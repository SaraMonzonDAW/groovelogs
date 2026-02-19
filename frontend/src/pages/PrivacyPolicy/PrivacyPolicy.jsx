import "./PrivacyPolicy.scss";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Política de Privacidad</h1>
        <p className="updated">Última actualización: Febrero 2026</p>

        <section>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            GrooveLogs es un proyecto académico desarrollado por Sara Monzón
            Quesada dentro del Ciclo Formativo de Grado Superior en Desarrollo
            de Aplicaciones Web (DAW).
          </p>
          <p>
            La aplicación no tiene finalidad comercial y ha sido creada con
            fines educativos.
          </p>
        </section>

        <section>
          <h2>2. Datos personales recogidos</h2>
          <ul>
            <li>Nombre</li>
            <li>Dirección de correo electrónico</li>
            <li>Contraseña (almacenada cifrada mediante BCrypt)</li>
            <li>Preferencias musicales añadidas por el usuario</li>
            <li>Fecha de registro y última actualización</li>
          </ul>
        </section>

        <section>
          <h2>3. Finalidad del tratamiento</h2>
          <p>Los datos se utilizan exclusivamente para:</p>
          <ul>
            <li>Gestionar el registro y autenticación de usuarios</li>
            <li>Permitir la creación de favoritos</li>
            <li>Permitir la valoración de contenidos musicales</li>
            <li>Garantizar el correcto funcionamiento de la aplicación</li>
          </ul>
        </section>

        <section>
          <h2>4. Base legal</h2>
          <p>
            La base legal del tratamiento es el consentimiento del usuario,
            otorgado al aceptar esta política en el momento del registro.
          </p>
        </section>

        <section>
          <h2>5. Conservación de los datos</h2>
          <p>
            Los datos se conservarán mientras el usuario mantenga su cuenta
            activa. El usuario puede solicitar la eliminación de su cuenta en
            cualquier momento.
          </p>
        </section>

        <section>
          <h2>6. Destinatarios</h2>
          <p>
            Los datos no se ceden a terceros. La aplicación puede estar alojada
            en servicios externos que actúan únicamente como soporte técnico.
          </p>
        </section>

        <section>
          <h2>7. Derechos del usuario</h2>
          <p>El usuario puede ejercer sus derechos de:</p>
          <ul>
            <li>Acceso</li>
            <li>Rectificación</li>
            <li>Supresión</li>
            <li>Limitación del tratamiento</li>
          </ul>
        </section>

        <section>
          <h2>8. Seguridad</h2>
          <ul>
            <li>Cifrado de contraseñas mediante BCrypt</li>
            <li>Autenticación de usuarios</li>
            <li>Control de acceso basado en roles</li>
            <li>Auditoría de creación y modificación de registros</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
