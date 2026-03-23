import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function TermsOfUse() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate">
        {language === 'en' ? (
          <>
            <h1>Novik Terms of Use</h1>
            <p className="text-sm text-slate-500">Last Updated: 17 August 2025</p>
            <p>These Terms of Use (the "Terms") govern access to and use of Novik, an AI-powered clinical decision support platform operated by Novik Nexus S.L. ("Novik Nexus", "we", "our" or "us"). By accessing or using Novik you agree to be bound by these Terms. If you do not agree, do not use Novik.</p>
            
            <h3>1. Introduction and Acceptance</h3>
            <p>Novik provides AI-generated suggestions to assist licensed dental and medical professionals. It is intended solely for use by adults who are legally qualified healthcare professionals. Novik is not designed for patients, minors or the general public. By using Novik you represent that you are a licensed professional (or supervised trainee) of at least 18 years of age and that you have authority to enter into these Terms on your own behalf or on behalf of an organisation you represent. You also agree to our Privacy Policy and Cookie Policy, which form part of these Terms.</p>
            
            <h3>2. Description of the Service</h3>
            <p>Novik analyses anonymized clinical inputs and external sources to provide informational suggestions. The platform does not provide medical or dental advice, diagnoses or treatment.</p>
            <p>All outputs are for informational and educational purposes only. You remain solely responsible for verifying any information from Novik and for all professional decisions. Novik should never be used in emergencies or as the sole basis for diagnosing or treating any individual. Novik does not create a provider–patient relationship between Novik Nexus and any person.</p>
            
            <h3>3. Eligibility, Accounts and Security</h3>
            <p>To use Novik you must be a licensed dental or medical professional (or a supervised student/trainee) and of legal adult age in your jurisdiction. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You must not allow patients, minors or other unauthorised individuals to access Novik. You may not transfer your account without our prior written consent. If you believe your account has been compromised, notify us immediately.</p>
            
            <h3>4. Data Input and De-identification</h3>
            <p>Novik is designed to process de-identified case data only. Health information that has been de-identified is not protected health information (PHI) under HIPAA. Do not input any patient identifiers or personal information. You are solely responsible for removing names, contact details, medical record numbers, facial images and other identifiers from the data you submit. If identifiable data is inadvertently provided, we will treat it as accidental and delete it. We do not collect or maintain PHI and are not a covered entity or business associate under HIPAA.</p>
            
            <h3>5. Acceptable Use and Prohibited Activities</h3>
            <p>You agree to use Novik for lawful purposes and in accordance with these Terms. In particular, you must not:</p>
            <ul>
              <li>Use Novik for diagnosis or treatment. Do not use Novik to diagnose or treat any specific patient or to provide direct medical advice.</li>
              <li>Rely without verification. Do not rely solely on Novik's outputs; always apply your professional judgment and consult authoritative sources.</li>
              <li>Submit personal or sensitive data. Do not enter any personal, identifying or sensitive information about patients or other individuals.</li>
              <li>Reverse engineer or copy. Do not attempt to access or discover Novik's source code, algorithms or underlying components, and do not use Novik outputs to train or develop competing products.</li>
              <li>Resell or misappropriate outputs. Do not resell, sublicense, publish or otherwise exploit Novik or its outputs outside your own internal professional use without our written consent.</li>
              <li>Abuse the service. Do not overload Novik with excessive requests, use bots or scripts, or attempt to disrupt or bypass security controls.</li>
              <li>Submit illegal or unethical content. Do not use Novik to generate or transmit content that is illegal, harmful, defamatory, discriminatory, obscene or otherwise unethical.</li>
              <li>Violate laws. Comply with all applicable laws, including data-protection, privacy, intellectual property and export control laws.</li>
            </ul>
            <p>Violation of this section may result in suspension or termination of your access to Novik and may expose you to legal consequences.</p>
            
            <h3>6. User Content and Intellectual Property</h3>
            <p>You retain ownership of the original content or data you provide ("User Content"). You grant Novik Nexus a worldwide, royalty-free, transferable and sublicensable licence to use, reproduce, modify and create derivative works from your User Content as needed to operate and improve Novik. You represent that you have the rights and consents necessary to submit the User Content.</p>
            <p>Novik Nexus and its licensors own all rights in the Novik software, models, documentation and outputs. We grant you a limited, non-exclusive, non-transferable licence to use Novik outputs solely for your own internal clinical decision support. You may not reproduce, publish, distribute or commercialise Novik outputs without our consent. All Novik and Novik Nexus trademarks and logos belong to us; you may not use them without permission. If you provide feedback or suggestions about Novik, we may use them without obligation to you.</p>
            
            <h3>7. Suspension and Termination</h3>
            <p>We may suspend or terminate your access to Novik if you violate these Terms, if required by law, or if we believe your use poses a risk to the platform, other users or patients. Upon termination, your right to use Novik ceases immediately, but the provisions relating to intellectual property, limitation of liability, indemnification and dispute resolution survive.</p>
            
            <h3>8. Disclaimers</h3>
            <p>Novik and all associated information are provided "as is" and "as available". To the fullest extent permitted by law, Novik Nexus disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and non-infringement.</p>
            <p>We do not warrant that Novik will meet your requirements, be uninterrupted or error-free, or provide accurate or up-to-date outputs. Your use of Novik is at your own risk. Novik Nexus makes no guarantee regarding clinical outcomes and assumes no duty of care toward your patients.</p>
            <p>Novik may link to third-party services or content. Novik Nexus does not endorse or control those third parties and is not responsible for their content or practices.</p>
            
            <h3>9. Limitation of Liability</h3>
            <p>To the extent permitted by law, Novik Nexus and its affiliates, officers, directors, employees and agents will not be liable for any indirect, incidental, special, consequential or punitive damages (including loss of profits, data or goodwill) arising out of or relating to your use of Novik or these Terms, even if advised of the possibility of such damages. We are not liable for any injuries or damages to patients or third parties resulting from your reliance on Novik. Our total liability under these Terms will not exceed the amount you paid (if any) for access to Novik in the twelve months before the event giving rise to liability; if you use Novik for free, our liability will be zero.</p>
            
            <h3>10. Indemnification</h3>
            <p>You agree to indemnify, defend and hold harmless Novik Nexus, its affiliates and their respective officers, directors, employees and agents from and against any claims, liabilities, damages, losses and expenses (including reasonable attorneys' fees) arising from: (a) your use or misuse of Novik; (b) your violation of these Terms; or (c) your violation of any law or the rights of any third party. Novik Nexus may assume the exclusive defence and control of any matter subject to indemnification, in which case you agree to cooperate and not settle any matter without our prior written consent.</p>
            
            <h3>11. Governing Law and Dispute Resolution</h3>
            <p>These Terms are governed by the laws of Spain, excluding its conflict of law rules. The courts of Spain, particularly those located in Murcia, will have exclusive jurisdiction over any disputes arising from these Terms or your use of Novik. You agree to submit to the personal jurisdiction of those courts. Before commencing formal legal proceedings, you agree to attempt to resolve any dispute with us informally by contacting info@novik.ai. If a dispute cannot be resolved informally, either party may pursue remedies in the courts described above. Notwithstanding the foregoing, Novik Nexus may seek injunctive or other equitable relief in any jurisdiction to protect its intellectual property or prevent misuse of Novik.</p>
            
            <h3>12. Changes to These Terms</h3>
            <p>We may modify these Terms at any time. We will post the updated Terms on Novik and update the "Last Updated" date. For material changes, we will provide additional notice (e.g. via email or in-app notification). Unless required otherwise by law, changes will take effect 15 days after notice. Your continued use of Novik after the effective date constitutes acceptance of the updated Terms. If you do not agree to the changes, you must stop using Novik.</p>
            
            <h3>13. Miscellaneous</h3>
            <p>These Terms constitute the entire agreement between you and Novik Nexus regarding Novik and supersede all prior agreements. If any provision is held invalid or unenforceable, the remaining provisions remain in full force. Our failure to enforce any right does not waive it. We may assign these Terms without restriction; you may not assign your rights without our consent. These Terms do not create any partnership, joint venture or agency relationship between us. Headings are for convenience only.</p>
            <p>If you have questions about these Terms, please contact info@novik.ai or write to Novik Nexus S.L., C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, Spain.</p>
          </>
        ) : (
          <>
            <h1>Términos de Uso de Novik</h1>
            <p className="text-sm text-slate-500">Fecha de última actualización: 17 de agosto de 2025</p>
            <p>Estos Términos de Uso (los "Términos") rigen el acceso y uso de Novik, una plataforma de apoyo a la decisión clínica impulsada por IA operada por Novik Nexus S.L. ("Novik Nexus", "nosotros", "nuestro" o "nos"). Al acceder o utilizar Novik, usted acepta estar sujeto a estos Términos. Si no está de acuerdo, no utilice Novik.</p>
            
            <h3>1. Introducción y aceptación</h3>
            <p>Novik ofrece sugerencias generadas por IA para ayudar a profesionales médicos y odontológicos colegiados. Está destinado exclusivamente a adultos que sean profesionales sanitarios legalmente cualificados. Novik no está diseñado para pacientes, menores ni público general. Al utilizar Novik, usted declara que es un profesional colegiado (o un estudiante/tesista supervisado) mayor de 18 años y que tiene autoridad para aceptar estos Términos en su propio nombre o en nombre de la organización que representa. También acepta nuestra Política de Privacidad y Política de Cookies, que forman parte de estos Términos.</p>
            
            <h3>2. Descripción del servicio</h3>
            <p>Novik analiza entradas clínicas anonimizadas y fuentes externas para proporcionar sugerencias informativas. La plataforma no proporciona asesoramiento médico ni odontológico, diagnósticos ni tratamientos. Todos los resultados son únicamente informativos y educativos.</p>
            <p>Usted sigue siendo el único responsable de verificar cualquier información de Novik y de todas las decisiones profesionales. Novik nunca debe utilizarse en emergencias ni como única base para diagnosticar o tratar a ninguna persona. Novik no crea una relación médico-paciente entre Novik Nexus y ninguna persona.</p>
            
            <h3>3. Elegibilidad, cuentas y seguridad</h3>
            <p>Para utilizar Novik debe ser un profesional médico u odontológico colegiado (o un estudiante/tesista supervisado) y tener la mayoría de edad legal en su jurisdicción. Usted es responsable de mantener la confidencialidad de sus credenciales de inicio de sesión y de todas las actividades realizadas con su cuenta. No debe permitir que pacientes, menores u otras personas no autorizadas accedan a Novik. No puede transferir su cuenta sin nuestro consentimiento previo por escrito. Si cree que su cuenta se ha visto comprometida, notifíquenoslo de inmediato.</p>
            
            <h3>4. Introducción de datos y desidentificación</h3>
            <p>Novik está diseñado para procesar únicamente datos desidentificados. La información sanitaria que ha sido desidentificada no es información sanitaria protegida (PHI) según la normativa HIPAA. No introduzca identificadores de pacientes ni información personal. Usted es el único responsable de eliminar nombres, datos de contacto, números de historia clínica, imágenes de rostros y otros identificadores de los datos que envíe. Si se proporciona accidentalmente información identificable, la trataremos como accidental y la eliminaremos. No recopilamos ni mantenemos PHI y no somos una entidad cubierta ni un asociado comercial según HIPAA.</p>
            
            <h3>5. Uso aceptable y actividades prohibidas</h3>
            <p>Usted se compromete a utilizar Novik para fines lícitos y de acuerdo con estos Términos. En particular, no debe:</p>
            <ul>
              <li>Usar Novik para diagnóstico o tratamiento. No utilice Novik para diagnosticar o tratar a ningún paciente específico ni para proporcionar asesoramiento médico directo.</li>
              <li>Confiar sin verificación. No confíe únicamente en los resultados de Novik; aplique siempre su criterio profesional y consulte fuentes autorizadas.</li>
              <li>Enviar datos personales o sensibles. No introduzca información personal, identificativa o sensible sobre pacientes u otras personas.</li>
              <li>Ingeniería inversa o copia. No intente acceder o descubrir el código fuente, algoritmos o componentes subyacentes de Novik, ni utilice los resultados de Novik para entrenar o desarrollar productos competidores.</li>
              <li>Revender o apropiarse indebidamente de los resultados. No revenda, sublicencie, publique ni explote de otro modo Novik o sus resultados fuera de su propio uso profesional interno sin nuestro consentimiento escrito.</li>
              <li>Abusar del servicio. No sobrecargue Novik con solicitudes excesivas, utilice bots o scripts, ni intente interrumpir o sortear los controles de seguridad.</li>
              <li>Enviar contenido ilegal o poco ético. No utilice Novik para generar o transmitir contenido ilegal, dañino, difamatorio, discriminatorio, obsceno o poco ético.</li>
              <li>Violar leyes. Cumpla todas las leyes aplicables, incluidas las leyes de protección de datos, privacidad, propiedad intelectual y control de exportaciones.</li>
            </ul>
            <p>La violación de esta sección puede dar lugar a la suspensión o terminación de su acceso a Novik y puede exponerle a consecuencias legales.</p>
            
            <h3>6. Contenido del usuario y propiedad intelectual</h3>
            <p>Usted conserva la propiedad del contenido o datos originales que proporcione («Contenido del Usuario»). Otorga a Novik Nexus una licencia mundial, gratuita, transferible y sublicenciable para utilizar, reproducir, modificar y crear obras derivadas de su Contenido del Usuario según sea necesario para operar y mejorar Novik. Usted declara que dispone de los derechos y consentimientos necesarios para enviar el Contenido del Usuario.</p>
            <p>Novik Nexus y sus licenciantes poseen todos los derechos sobre el software, los modelos, la documentación y los resultados de Novik. Le concedemos una licencia limitada, no exclusiva e intransferible para utilizar los resultados de Novik únicamente para su propio apoyo interno a la decisión clínica. No puede reproducir, publicar, distribuir ni comercializar los resultados de Novik sin nuestro consentimiento. Todas las marcas y logotipos de Novik y Novik Nexus nos pertenecen; no puede utilizarlos sin permiso. Si proporciona comentarios o sugerencias sobre Novik, podemos utilizarlos sin obligación hacia usted.</p>
            
            <h3>7. Suspensión y terminación</h3>
            <p>Podemos suspender o cancelar su acceso a Novik si infringe estos Términos, si la ley lo exige o si creemos que su uso supone un riesgo para la plataforma, otros usuarios o pacientes. Tras la terminación, su derecho a utilizar Novik cesará inmediatamente, pero las disposiciones relativas a propiedad intelectual, limitación de responsabilidad, indemnización y resolución de disputas seguirán vigentes.</p>
            
            <h3>8. Descargos de responsabilidad</h3>
            <p>Novik y toda la información asociada se proporcionan «tal cual» y «según disponibilidad». En la máxima medida permitida por la ley, Novik Nexus rechaza todas las garantías, expresas o implícitas, incluidas las garantías de comerciabilidad, idoneidad para un propósito particular, exactitud y no infracción.</p>
            <p>No garantizamos que Novik satisfaga sus requisitos, sea ininterrumpido o libre de errores, o proporcione resultados precisos o actualizados. Usted utiliza Novik bajo su propio riesgo. Novik Nexus no garantiza resultados clínicos y no asume ningún deber de cuidado hacia sus pacientes.</p>
            <p>Novik puede enlazar con servicios o contenido de terceros. Novik Nexus no respalda ni controla a esos terceros y no es responsable de su contenido o prácticas.</p>
            
            <h3>9. Limitación de responsabilidad</h3>
            <p>En la medida permitida por la ley, Novik Nexus y sus afiliados, directivos, empleados y agentes no serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo (incluidos pérdida de beneficios, datos o reputación) que surja de su uso de Novik o de estos Términos, incluso si se nos ha advertido de la posibilidad de tales daños. No somos responsables de ninguna lesión o daño a pacientes o terceros resultante de su confianza en Novik. Nuestra responsabilidad total en virtud de estos Términos no excederá la cantidad que usted haya pagado (si corresponde) por acceder a Novik en los doce meses anteriores al hecho que originó la responsabilidad; si utiliza Novik de forma gratuita, nuestra responsabilidad será cero.</p>
            
            <h3>10. Indemnización</h3>
            <p>Usted acepta indemnizar, defender y eximir de responsabilidad a Novik Nexus, sus afiliados y sus respectivos directivos, empleados y agentes por cualquier reclamación, responsabilidad, daño, pérdida y gasto (incluidos honorarios razonables de abogados) que surjan de: (a) su uso o uso indebido de Novik; (b) su violación de estos Términos; o (c) su violación de cualquier ley o de los derechos de terceros. Novik Nexus puede asumir la defensa exclusiva de cualquier asunto sujeto a indemnización, en cuyo caso usted acepta cooperar y no llegar a acuerdos sin nuestro consentimiento previo por escrito.</p>
            
            <h3>11. Ley aplicable y resolución de disputas</h3>
            <p>Estos Términos se rigen por las leyes de España, excluyendo sus normas sobre conflictos de leyes. Los tribunales de España, concretamente los situados en Murcia, tendrán jurisdicción exclusiva sobre cualquier disputa derivada de estos Términos o de su uso de Novik. Usted acepta someterse a la jurisdicción personal de dichos tribunales.</p>
            <p>Antes de iniciar procedimientos legales formales, acepta intentar resolver cualquier disputa con nosotros de manera informal contactando con info@novik.ai. Si no se puede resolver una disputa de forma amistosa, cualquiera de las partes podrá presentar acciones ante los tribunales indicados. Sin perjuicio de lo anterior, Novik Nexus podrá solicitar medidas cautelares u otra compensación equitativa en cualquier jurisdicción para proteger su propiedad intelectual o prevenir el uso indebido de Novik.</p>
            
            <h3>12. Cambios en estos Términos</h3>
            <p>Podemos modificar estos Términos en cualquier momento. Publicaremos los Términos actualizados en Novik y actualizaremos la fecha de «Última actualización». Para cambios significativos, proporcionaremos un aviso adicional (por ejemplo, mediante correo electrónico o notificación en la aplicación). A menos que la ley requiera lo contrario, los cambios entrarán en vigor 15 días después del aviso. Su uso continuado de Novik después de la fecha de entrada en vigor constituye la aceptación de los Términos actualizados. Si no está de acuerdo con los cambios, debe dejar de utilizar Novik.</p>
            
            <h3>13. Miscelánea</h3>
            <p>Estos Términos constituyen el acuerdo completo entre usted y Novik Nexus con respecto a Novik y sustituyen todos los acuerdos previos. Si alguna disposición se considera inválida o inaplicable, las disposiciones restantes permanecerán en pleno vigor. Nuestro incumplimiento a la hora de hacer valer cualquier derecho no implica renuncia a ese derecho. Podemos ceder estos Términos sin restricciones; usted no puede ceder sus derechos sin nuestro consentimiento. Estos Términos no crean ninguna relación de sociedad, empresa conjunta o agencia entre nosotros. Los encabezados se incluyen únicamente por comodidad.</p>
            <p>Si tiene preguntas sobre estos Términos, póngase en contacto con info@novik.ai o escriba a Novik Nexus S.L., C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, España.</p>
          </>
        )}
      </div>
    </div>
  );
}
