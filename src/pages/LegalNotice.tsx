import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LegalNotice() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate">
        {language === 'en' ? (
          <>
            <h1>Legal Notice</h1>
            <p className="text-sm text-slate-500">Last Updated: 17 August 2025</p>
            <p>In accordance with the duty of information set forth in Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the following details are provided:</p>
            <ul>
              <li><strong>VAT / Tax ID:</strong> B24836553</li>
              <li><strong>Registered Address:</strong> C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, Spain</li>
              <li><strong>Contact Email:</strong> info@novik.ai</li>
            </ul>
            
            <h3>Purpose of the Website</h3>
            <p>This website provides access to Novik, an AI-powered clinical decision support tool for dental professionals.</p>
            
            <h3>Intellectual and Industrial Property</h3>
            <p>All content, trademarks, logos, designs, text, and software on this site are the property of Novik Nexus S.L. or third parties licensed for use. Any reproduction, distribution, or modification without express consent is prohibited.</p>
            
            <h3>Disclaimer of Liability</h3>
            <p>The information and recommendations provided by Novik are intended as clinical support and do not replace the professional judgment of dentists. Novik Nexus S.L. is not liable for damages arising from misuse of the platform.</p>
            
            <h3>Jurisdiction and Applicable Law</h3>
            <p>Any disputes or claims related to this website shall be governed by Spanish law and submitted to the courts of Murcia, Spain.</p>
          </>
        ) : (
          <>
            <h1>Aviso Legal</h1>
            <p className="text-sm text-slate-500">Última actualización: 17 de agosto de 2025</p>
            <p>En cumplimiento con el deber de información establecido en la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos:</p>
            <ul>
              <li><strong>Titular del sitio web:</strong> Novik Nexus S.L.</li>
              <li><strong>NIF/CIF:</strong> B24836553</li>
              <li><strong>Domicilio social:</strong> C/ La Cruz 2, Entresuelo, 30820 Alcantarilla, Murcia, España</li>
              <li><strong>Correo electrónico de contacto:</strong> info@novik.ai</li>
            </ul>
            
            <h3>Objeto del sitio web</h3>
            <p>El presente sitio web tiene por finalidad dar a conocer la plataforma Novik, un asistente clínico con inteligencia artificial para profesionales de la odontología.</p>
            
            <h3>Propiedad intelectual e industrial</h3>
            <p>Todos los contenidos, marcas, logotipos, diseños, textos y software presentes en este sitio web son propiedad de Novik Nexus S.L. o de terceros con autorización. Queda prohibida su reproducción, distribución o modificación sin consentimiento expreso.</p>
            
            <h3>Exclusión de responsabilidad</h3>
            <p>La información y recomendaciones ofrecidas por Novik tienen carácter de apoyo clínico y no sustituyen el juicio profesional del odontólogo. Novik Nexus S.L. no se hace responsable de los daños derivados del uso indebido de la plataforma.</p>
            
            <h3>Jurisdicción y legislación aplicable</h3>
            <p>Para la resolución de cualquier conflicto o cuestión relacionada con este sitio web, será de aplicación la legislación española y se someterán a los juzgados y tribunales de Murcia (España).</p>
          </>
        )}
      </div>
    </div>
  );
}
