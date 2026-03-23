import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate">
        {language === 'en' ? (
          <>
            <h1>Novik Privacy Policy</h1>
            <p className="text-sm text-slate-500">Effective Date: 17 August 2025</p>
            <p>Novik is an AI-driven clinical decision support tool operated by Novik Nexus S.L. ("Novik Nexus", "we" or "us"). We are committed to protecting your privacy. This policy describes how we collect, use, share and protect personal information when you use the Novik platform. We comply with the European Union's General Data Protection Regulation (GDPR), Spain's LOPD-GDD, the United States' Health Insurance Portability and Accountability Act (HIPAA), the California Consumer Privacy Act/California Privacy Rights Act (CCPA/CPRA), Brazil's Lei Geral de Proteção de Dados (LGPD), Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), Australia's Privacy Act 1988, and other applicable laws in the jurisdictions where Novik is used. Novik Nexus is established in Spain and acts as the data controller for personal data collected through Novik.</p>
            
            <h3>1. Who We Are and Scope</h3>
            <p>This Privacy Policy applies to all users of the Novik web and mobile platform worldwide. It covers personal information collected through the Novik application, our websites and related services. It does not apply to third-party websites or services that may be linked within Novik. If you do not agree with our practices, please do not use Novik.</p>
            
            <h3>2. Data Controller and Contact Details</h3>
            <p>The data controller is Novik Nexus S.L., a company registered in Spain (CIF B24836553) with its business address at C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, Spain. You can contact us by email at info@novik.ai or by telephone at +34 690 957 910. If required by law, we will designate a Data Protection Officer (DPO) and publish their contact details here.</p>
            
            <h3>3. Information We Collect</h3>
            <p>We strive to minimize the personal data we collect. Novik is designed to process only anonymized case data; we do not collect protected health information (PHI). The categories of data we collect include:</p>
            <ul>
              <li><strong>Account Information</strong> – When you register or sign in, we collect your email address and a hashed (encrypted) password. We may record your role (professional or student), your country or region, and your account creation date. We do not require your full name or physical address to use Novik.</li>
              <li><strong>Technical and Usage Data</strong> – We automatically collect technical data such as IP address, device identifiers, browser type, app version, operating system, user-agent string and language. We log usage information such as log-in timestamps, queries entered, features used, session duration and error reports. This helps us secure the platform and improve performance.</li>
              <li><strong>User Inputs and Uploaded Files</strong> – If you input text or upload files (e.g. case descriptions, PDFs, audio recordings or X-ray images) to Novik, our systems process that content to generate recommendations. Users must ensure that no personal identifiers are included. Under the U.S. HIPAA Privacy Rule, health information that has been de-identified is not PHI and thus is not subject to HIPAA. You are responsible for removing identifiers such as names, contact details, medical record numbers, facial images and any other elements that could identify an individual. We treat the content you submit as anonymous and do not link it to your identity.</li>
              <li><strong>Cookies and Similar Technologies</strong> – We use a minimal number of cookies to operate our website and app. Strictly necessary cookies enable core features (e.g. login, payment). With your consent, we may also use functionality or analytics cookies to remember preferences and analyze how users interact with Novik. We do not use advertising or tracking cookies.</li>
              <li><strong>Communications</strong> – When you contact us (e.g. by email or through a support form), we collect the information you provide (such as your name, email address and message content). We use this to respond to you and maintain records of the communication.</li>
            </ul>
            <p>We do not intentionally collect special categories of personal data (e.g. race, religion, genetic data) or payment/financial information through Novik. If payments are required in future, these will be handled by a secure third-party provider under separate terms.</p>
            
            <h3>4. How We Use Your Information</h3>
            <p>We use the collected data for the following purposes, consistent with applicable law:</p>
            <ul>
              <li><strong>Providing and improving the service.</strong> We process your account details to authenticate you and provide access to Novik. We analyze your inputs (in anonymized form) to generate clinical recommendations and to monitor and improve the accuracy, security and performance of Novik. We maintain logs to debug issues and prevent misuse.</li>
              <li><strong>Personalized recommendations.</strong> Novik tailors its responses based on the anonymized case information you provide. For example, if you indicate that a patient has an allergy (without identifying the patient), the system will adjust its suggestions accordingly. These recommendations are for your professional reference only and are not connected to your identity or the patient's identity.</li>
              <li><strong>Analytics and development.</strong> We analyze aggregated usage patterns to understand how clinicians interact with Novik. This helps us improve features and train our algorithms. We may create de-identified statistics or reports from aggregated data.</li>
              <li><strong>Communications.</strong> We use your contact information to respond to your inquiries, notify you about changes to our policies or terms, send technical notices and, if applicable, send marketing or research communications (you may opt out of marketing at any time).</li>
              <li><strong>Compliance, safety and legal.</strong> We may use information to comply with legal obligations, enforce our Terms of Use, protect the rights and safety of Novik Nexus and our users, and detect and prevent fraud, security breaches or other harmful activity.</li>
            </ul>
            
            <h3>5. Legal Basis for Processing</h3>
            <p>Under the GDPR and equivalent laws, we rely on the following legal bases:</p>
            <ul>
              <li><strong>Performance of a contract.</strong> We process account information and user inputs to provide the service you request. Without this data, we cannot deliver Novik.</li>
              <li><strong>Legitimate interests.</strong> We process technical data, usage logs and minimal contact details to secure and improve Novik. We have a legitimate interest in understanding how our service is used and ensuring its reliability and safety. These interests are balanced against your rights and freedoms.</li>
              <li><strong>Consent.</strong> We rely on your consent to place non-essential cookies and to send you optional communications. You can withdraw consent at any time.</li>
              <li><strong>Legal compliance.</strong> We may process data as necessary to comply with applicable laws and regulations (for example, to respond to lawful requests from authorities).</li>
            </ul>
            <p>Novik Nexus does not process identifiable health data and is not a "covered entity" or "business associate" under HIPAA because de-identified health information is not protected health information (PHI) under the HIPAA Privacy Rule. If we ever process PHI in collaboration with U.S. healthcare providers, we will do so in compliance with HIPAA (including signing Business Associate Agreements and implementing required safeguards).</p>
            
            <h3>6. Data Sharing and Disclosure</h3>
            <p>We do not sell personal information and do not share it for advertising or cross-context behavioural marketing. We only share personal data as follows:</p>
            <ul>
              <li><strong>Service providers.</strong> We engage trusted third parties to provide hosting, analytics, payment processing or customer support. These providers may access personal information only to perform services on our behalf and are contractually bound to protect it.</li>
              <li><strong>Legal and regulatory purposes.</strong> We may disclose information when required to comply with a legal obligation, court order or governmental request, to enforce our Terms of Use, to protect our rights or to prevent harm to users or the public.</li>
              <li><strong>Business transfers.</strong> In the event of a merger, acquisition or sale of assets, personal data may be transferred as part of that transaction. We will notify you of such a change and any choices you may have.</li>
              <li><strong>Aggregated or de-identified data.</strong> We may share aggregated statistics or anonymized reports that do not identify any individual, for research or statistical purposes.</li>
            </ul>
            
            <h3>7. International Data Transfers</h3>
            <p>We store personal data on servers located in the European Union. However, our service providers may operate in other countries. When we transfer data outside the European Economic Area (EEA), we use legal mechanisms such as the European Commission's Standard Contractual Clauses or rely on adequacy decisions to ensure that your data receives an adequate level of protection. By using Novik, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws than your own.</p>
            
            <h3>8. Data Retention</h3>
            <p>We retain personal data only for as long as necessary for the purposes described in this policy, including to provide the service, comply with legal obligations, resolve disputes and enforce our agreements. When data is no longer required, we will either anonymize or securely delete it. Aggregated usage data may be retained for longer for analytics and research purposes, but it will not identify any individual.</p>
            
            <h3>9. Security Measures</h3>
            <p>We implement appropriate technical and organisational measures to protect personal information from unauthorized access, disclosure, alteration or destruction. These measures include encryption, access controls, secure development practices and regular monitoring.</p>
            <p>However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security. You are responsible for safeguarding your account credentials and for promptly notifying us of any suspected security incident.</p>
            
            <h3>10. Your Rights</h3>
            <p>Depending on your location, you have specific rights regarding your personal data.</p>
            <p><strong>Users in the European Union and United Kingdom</strong><br/>
            Under the GDPR/UK GDPR you have the right to: (i) access the personal data we hold about you; (ii) rectify inaccurate or incomplete data; (iii) erase your data in certain circumstances ("right to be forgotten"); (iv) restrict or object to processing; (v) data portability, i.e. obtain your data in a structured, commonly used format; and (vi) withdraw consent at any time for processing based on consent. You also have the right to lodge a complaint with your local data protection authority.</p>
            <p><strong>Users in California (CCPA/CPRA)</strong><br/>
            California residents have the right to: (i) request disclosure of the categories and specific pieces of personal information we collect, use and disclose; (ii) request deletion of personal information (subject to exceptions); (iii) request correction of inaccurate personal information; (iv) opt out of the sale or sharing of personal information; and (v) not be discriminated against for exercising privacy rights. We do not sell personal information and do not share it for cross-context behavioural advertising. To exercise your California rights, contact us using the details below.</p>
            <p><strong>Users in Brazil (LGPD)</strong><br/>
            Under the LGPD you may: (i) confirm whether we process your personal data; (ii) request access to your data; (iii) correct incomplete, inaccurate or outdated data; (iv) anonymize, block or delete unnecessary or excessive data; (v) request portability to another provider; (vi) request information about public and private entities with which we share data; (vii) revoke consent; and (viii) lodge a complaint with the Brazilian data protection authority (ANPD).</p>
            <p><strong>Users in Canada and Australia</strong><br/>
            Canadian users have the right to access the personal information we hold and to challenge its accuracy under PIPEDA. Australian users may request access to and correction of their personal information and may complain to the Office of the Australian Information Commissioner (OAIC) if unsatisfied.</p>
            <p><strong>Exercising Your Rights</strong><br/>
            You may exercise your rights by contacting us at info@novik.ai. We may need to verify your identity before processing your request. We will respond within the timeframe required by applicable law (e.g. 30 days under GDPR, 45 days under CCPA/CPRA). We may refuse requests where permitted by law (for example, if fulfilling the request would infringe the rights of others or reveal confidential information). There is no charge for making a request unless it is unfounded or excessive, in which case we may charge a reasonable fee or refuse to comply.</p>
            
            <h3>11. Children's Privacy</h3>
            <p>Novik is intended for use only by adults. We do not knowingly collect personal information from children under 18 years of age. If we become aware that a minor has provided us with personal data, we will delete it. Parents or guardians who believe that their child has provided personal data to us may contact us to request removal.</p>
            
            <h3>12. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies or legal requirements. When we make changes, we will revise the Effective Date at the top of the policy. For material changes, we may provide a more prominent notice or seek your consent where required. We encourage you to review this policy periodically. Your continued use of Novik after an update signifies acceptance of the revised policy.</p>
            
            <h3>13. Contact Us</h3>
            <p>If you have any questions, concerns or requests regarding this Privacy Policy or your personal data, please contact us at info@novik.ai or by postal mail at Novik nexus S.L., C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, Spain. If you are not satisfied with our response, you may lodge a complaint with your local data protection authority.</p>
          </>
        ) : (
          <>
            <h1>Política de Privacidad de Novik</h1>
            <p className="text-sm text-slate-500">Fecha de entrada en vigor: 17 de agosto de 2025</p>
            <p>Novik es una herramienta de apoyo a la decisión clínica impulsada por IA operada por Novik Nexus S.L. ("Novik Nexus", "nosotros" o "nuestro"). Estamos comprometidos a proteger su privacidad. Esta política describe cómo recopilamos, utilizamos, compartimos y protegemos la información personal cuando utiliza la plataforma Novik. Cumplimos con el Reglamento General de Protección de Datos (GDPR) de la Unión Europea, la LOPD-GDD de España, la Ley de Portabilidad y Responsabilidad de Seguros de Salud (HIPAA) de los Estados Unidos, la Ley de Privacidad del Consumidor de California/Ley de Derechos de Privacidad de California (CCPA/CPRA), la Ley General de Protección de Datos (LGPD) de Brasil, la Ley de Protección de Información Personal y Documentos Electrónicos (PIPEDA) de Canadá, la Ley de Privacidad de 1988 de Australia y otras leyes aplicables en las jurisdicciones donde se utiliza Novik. Novik Nexus está establecida en España y actúa como responsable del tratamiento de los datos personales recopilados a través de Novik.</p>
            
            <h3>1. Quiénes somos y alcance</h3>
            <p>Esta Política de Privacidad se aplica a todos los usuarios de la plataforma web y móvil de Novik en todo el mundo. Cubre la información personal recopilada a través de la aplicación Novik, nuestros sitios web y los servicios relacionados. No se aplica a sitios o servicios de terceros que puedan estar vinculados dentro de Novik. Si no está de acuerdo con nuestras prácticas, no utilice Novik.</p>
            
            <h3>2. Responsable del tratamiento y datos de contacto</h3>
            <p>El responsable del tratamiento es Novik Nexus S.L., una empresa registrada en España (CIF B24836553) con domicilio social en C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, España. Puede contactarnos por correo electrónico en info@novik.ai o por teléfono en +34 690 957 910. Si la ley lo exige, designaremos un Delegado de Protección de Datos (DPD) y publicaremos aquí sus datos de contacto.</p>
            
            <h3>3. Información que recopilamos</h3>
            <p>Nos esforzamos por minimizar los datos personales que recopilamos. Novik está diseñado para procesar únicamente datos de casos anonimizados; no recopilamos información sanitaria protegida (PHI). Las categorías de datos que recopilamos incluyen:</p>
            <ul>
              <li><strong>Información de la cuenta</strong> – Cuando se registra o inicia sesión, recopilamos su dirección de correo electrónico y una contraseña cifrada. Podemos registrar su rol (profesional o estudiante), su país o región y la fecha de creación de su cuenta. No requerimos su nombre completo ni su dirección física para utilizar Novik.</li>
              <li><strong>Datos técnicos y de uso</strong> – Recopilamos automáticamente datos técnicos como la dirección IP, identificadores de dispositivo, tipo de navegador, versión de la aplicación, sistema operativo, cadena de agente de usuario e idioma. Registramos información de uso como marcas de tiempo de inicio de sesión, consultas introducidas, funciones utilizadas, duración de la sesión e informes de errores. Esto nos ayuda a proteger la plataforma y mejorar su rendimiento.</li>
              <li><strong>Entradas del usuario y archivos cargados</strong> – Si introduce texto o carga archivos (por ejemplo, descripciones de casos, PDFs, grabaciones de audio o imágenes de radiografías) en Novik, nuestros sistemas procesan ese contenido para generar recomendaciones. Los usuarios deben asegurarse de que no se incluyan identificadores personales. Según la normativa de EE. UU., la información sanitaria que se ha desidentificado no se considera PHI y, por tanto, no está sujeta a la HIPAA. Usted es responsable de eliminar identificadores como nombres, datos de contacto, números de historia clínica, imágenes de rostros y cualquier otro elemento que pueda identificar a una persona. Tratamos el contenido que envía como anónimo y no lo vinculamos a su identidad.</li>
              <li><strong>Cookies y tecnologías similares</strong> – Utilizamos un número mínimo de cookies para hacer funcionar nuestro sitio web y la aplicación. Las cookies estrictamente necesarias habilitan funciones básicas (por ejemplo, inicio de sesión, pago). Con su consentimiento, también podemos utilizar cookies de funcionalidad o analítica para recordar preferencias y analizar cómo interactúan los usuarios con Novik. No utilizamos cookies publicitarias ni de seguimiento.</li>
              <li><strong>Comunicaciones</strong> – Cuando se comunica con nosotros (por ejemplo, por correo electrónico o mediante un formulario de soporte), recopilamos la información que proporciona (como su nombre, dirección de correo electrónico y el contenido del mensaje). Utilizamos esto para responderle y mantener un registro de la comunicación.</li>
            </ul>
            <p>No recopilamos intencionadamente categorías especiales de datos personales (p. ej., raza, religión, datos genéticos) ni información financiera/pagos a través de Novik. Si en el futuro se requieren pagos, estos serán gestionados por un proveedor tercero seguro en virtud de términos separados.</p>
            
            <h3>4. Cómo utilizamos su información</h3>
            <p>Utilizamos los datos recopilados para los siguientes fines, de conformidad con la ley aplicable:</p>
            <ul>
              <li><strong>Proporcionar y mejorar el servicio.</strong> Tratamos sus datos de cuenta para autenticarle y darle acceso a Novik. Analizamos sus entradas (de forma anonimizada) para generar recomendaciones clínicas y para supervisar y mejorar la precisión, seguridad y rendimiento de Novik. Mantenemos registros para depurar problemas y prevenir usos indebidos.</li>
              <li><strong>Recomendaciones personalizadas.</strong> Novik adapta sus respuestas en función de la información clínica anonimizada que usted proporciona. Por ejemplo, si indica que un paciente tiene una alergia (sin identificar al paciente), el sistema ajustará sus sugerencias en consecuencia. Estas recomendaciones son solo para su referencia profesional y no están conectadas a su identidad ni a la del paciente.</li>
              <li><strong>Analítica y desarrollo.</strong> Analizamos patrones de uso agregados para comprender cómo interactúan los clínicos con Novik. Esto nos ayuda a mejorar las funciones y entrenar nuestros algoritmos. Podemos crear estadísticas o informes desidentificados a partir de datos agregados.</li>
              <li><strong>Comunicaciones.</strong> Utilizamos su información de contacto para responder a sus consultas, notificarle sobre cambios en nuestras políticas o términos, enviar avisos técnicos y, si corresponde, enviar comunicaciones de marketing o investigación (puede optar por no recibir marketing en cualquier momento).</li>
              <li><strong>Cumplimiento, seguridad y legalidad.</strong> Podemos utilizar la información para cumplir con obligaciones legales, hacer cumplir nuestros Términos de Uso, proteger los derechos y la seguridad de Novik Nexus y nuestros usuarios, y detectar y prevenir fraude, fallos de seguridad u otras actividades dañinas.</li>
            </ul>
            
            <h3>5. Base legal del tratamiento</h3>
            <p>De acuerdo con el GDPR y leyes equivalentes, nos basamos en las siguientes bases legales:</p>
            <ul>
              <li><strong>Ejecución de un contrato.</strong> Tratamos información de la cuenta y las entradas del usuario para proporcionar el servicio que solicita. Sin estos datos, no podemos prestar Novik.</li>
              <li><strong>Intereses legítimos.</strong> Tratamos datos técnicos, registros de uso y datos de contacto mínimos para proteger y mejorar Novik. Tenemos un interés legítimo en comprender cómo se utiliza nuestro servicio y garantizar su fiabilidad y seguridad. Estos intereses se equilibran con sus derechos y libertades.</li>
              <li><strong>Consentimiento.</strong> Dependemos de su consentimiento para establecer cookies no esenciales y para enviarle comunicaciones opcionales. Puede retirar su consentimiento en cualquier momento.</li>
              <li><strong>Cumplimiento legal.</strong> Podemos tratar datos según sea necesario para cumplir con leyes y regulaciones aplicables (por ejemplo, para responder a solicitudes de autoridades).</li>
            </ul>
            <p>Novik Nexus no procesa datos de salud identificables y no es una «entidad cubierta» ni un «asociado comercial» según HIPAA, porque la información de salud desidentificada no es información sanitaria protegida (PHI) bajo la normativa HIPAA. Si en el futuro procesamos PHI en colaboración con proveedores de EE. UU., lo haremos en cumplimiento de HIPAA (incluida la firma de acuerdos de asociado comercial y la implementación de medidas de seguridad requeridas).</p>
            
            <h3>6. Compartición y divulgación de datos</h3>
            <p>No vendemos información personal ni la compartimos con fines de publicidad o marketing conductual. Solo compartimos datos personales en los siguientes casos:</p>
            <ul>
              <li><strong>Proveedores de servicios.</strong> Contratamos a terceros de confianza para proporcionar alojamiento, analítica, procesamiento de pagos o soporte al cliente. Estos proveedores pueden acceder a la información personal solo para prestar servicios en nuestro nombre y están contractualmente obligados a protegerla.</li>
              <li><strong>Fines legales y regulatorios.</strong> Podemos divulgar información cuando sea necesario para cumplir con una obligación legal, una orden judicial o una solicitud gubernamental, para hacer cumplir nuestros Términos de Uso, para proteger nuestros derechos o para prevenir daños a usuarios o al público.</li>
              <li><strong>Transferencias empresariales.</strong> En caso de fusión, adquisición o venta de activos, los datos personales pueden transferirse como parte de la transacción. Le notificaremos dicho cambio y cualquier opción que pueda tener.</li>
              <li><strong>Datos agregados o desidentificados.</strong> Podemos compartir estadísticas agregadas o informes anonimizados que no identifiquen a ninguna persona, para fines de investigación o estadísticos.</li>
            </ul>
            
            <h3>7. Transferencias internacionales de datos</h3>
            <p>Almacenamos los datos personales en servidores ubicados en la Unión Europea. Sin embargo, nuestros proveedores pueden operar en otros países. Cuando transferimos datos fuera del Espacio Económico Europeo (EEE), utilizamos mecanismos legales como las Cláusulas Contractuales Tipo de la Comisión Europea o dependemos de decisiones de adecuación para garantizar que sus datos reciben un nivel de protección adecuado. Al utilizar Novik, usted acepta la transferencia de su información a países fuera de su país de residencia, que pueden tener leyes de protección de datos diferentes a las suyas.</p>
            
            <h3>8. Conservación de datos</h3>
            <p>Conservamos los datos personales solo durante el tiempo necesario para los fines descritos en esta política, incluidos para proporcionar el servicio, cumplir con obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos. Cuando los datos ya no sean necesarios, los anonimizaremos o eliminaremos de forma segura. Los datos de uso agregados pueden conservarse por más tiempo para análisis e investigación, pero no identificarán a ninguna persona.</p>
            
            <h3>9. Medidas de seguridad</h3>
            <p>Implementamos medidas técnicas y organizativas apropiadas para proteger la información personal contra el acceso no autorizado, divulgación, alteración o destrucción. Estas medidas incluyen cifrado, controles de acceso, prácticas de desarrollo seguro y supervisión regular.</p>
            <p>Sin embargo, ningún método de transmisión o almacenamiento es completamente seguro y no podemos garantizar una seguridad absoluta. Usted es responsable de proteger las credenciales de su cuenta y de notificarnos de inmediato cualquier incidente de seguridad sospechoso.</p>
            
            <h3>10. Sus derechos</h3>
            <p>Dependiendo de su ubicación, tiene derechos específicos respecto a sus datos personales.</p>
            <p><strong>Usuarios en la Unión Europea y el Reino Unido</strong><br/>
            Bajo el GDPR/UK GDPR tiene derecho a: (i) acceder a los datos personales que tenemos sobre usted; (ii) rectificar datos inexactos o incompletos; (iii) eliminar sus datos en determinadas circunstancias («derecho al olvido»); (iv) restringir u oponerse al tratamiento; (v) portabilidad de datos, es decir, obtener sus datos en un formato estructurado de uso común; y (vi) retirar el consentimiento en cualquier momento para el tratamiento basado en el consentimiento. También tiene derecho a presentar una reclamación ante su autoridad de protección de datos local.</p>
            <p><strong>Usuarios en California (CCPA/CPRA)</strong><br/>
            Los residentes de California tienen derecho a: (i) solicitar la divulgación de las categorías y piezas específicas de información personal que recopilamos, usamos y divulgamos; (ii) solicitar la eliminación de la información personal (sujeto a excepciones); (iii) solicitar la corrección de información personal inexacta; (iv) optar por no vender ni compartir información personal; y (v) no ser discriminados por ejercer sus derechos de privacidad. No vendemos información personal ni la compartimos para publicidad conductual. Para ejercer sus derechos en California, póngase en contacto con nosotros.</p>
            <p><strong>Usuarios en Brasil (LGPD)</strong><br/>
            En virtud de la LGPD, puede: (i) confirmar si tratamos sus datos personales; (ii) solicitar acceso a sus datos; (iii) corregir datos incompletos, inexactos o desactualizados; (iv) anonimizar, bloquear o eliminar datos innecesarios o excesivos; (v) solicitar la portabilidad a otro proveedor; (vi) solicitar información sobre las entidades públicas y privadas con las que compartimos datos; (vii) revocar el consentimiento; y (viii) presentar una queja ante la autoridad brasileña de protección de datos (ANPD).</p>
            <p><strong>Usuarios en Canadá y Australia</strong><br/>
            Los usuarios canadienses tienen derecho a acceder a la información personal que tenemos y a impugnar su exactitud en virtud de PIPEDA. Los usuarios australianos pueden solicitar el acceso y la corrección de su información personal y pueden presentar una queja ante la Oficina del Comisionado de Información de Australia (OAIC) si no están satisfechos.</p>
            <p><strong>Ejercicio de sus derechos</strong><br/>
            Puede ejercer sus derechos poniéndose en contacto con nosotros en info@novik.ai. Es posible que necesitemos verificar su identidad antes de procesar su solicitud. Responderemos dentro del plazo requerido por la ley aplicable (por ejemplo, 30 días según el GDPR, 45 días según CCPA/CPRA). Podemos rechazar solicitudes en los casos permitidos por la ley (por ejemplo, si cumplir la solicitud infringiría los derechos de otras personas o revelaría información confidencial). No se cobrará ninguna tarifa por realizar una solicitud a menos que sea infundada o excesiva; en ese caso, podemos cobrar una tarifa razonable o negarnos a cumplir.</p>
            
            <h3>11. Privacidad de los menores</h3>
            <p>Novik está destinado solo a adultos. No recopilamos intencionadamente información personal de menores de 18 años. Si nos damos cuenta de que un menor nos ha proporcionado datos personales, los eliminaremos. Los padres o tutores que crean que su hijo nos ha proporcionado datos personales pueden ponerse en contacto con nosotros para solicitar su eliminación.</p>
            
            <h3>12. Cambios en esta política</h3>
            <p>Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas, tecnologías o requisitos legales. Cuando realicemos cambios, revisaremos la Fecha de entrada en vigor al principio de la política. Para cambios significativos, podremos proporcionar un aviso más destacado o solicitar su consentimiento si así se requiere. Le animamos a revisar esta política periódicamente. Su uso continuado de Novik tras una actualización implica la aceptación de la política revisada.</p>
            
            <h3>13. Contacto</h3>
            <p>Si tiene alguna pregunta, inquietud o solicitud respecto a esta Política de Privacidad o sus datos personales, póngase en contacto con nosotros en info@novik.ai o por correo postal en Novik Nexus S.L., C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, España. Si no está satisfecho con nuestra respuesta, puede presentar una queja ante su autoridad de protección de datos local.</p>
          </>
        )}
      </div>
    </div>
  );
}
