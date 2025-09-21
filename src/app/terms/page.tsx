export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-6 max-sm:p-5 py-8 max-sm:py-7 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-primary text-3xl font-bold">
          Termos de Uso – Di Maior CV Starter
        </h1>
        <p className="text-sm">Última atualização: setembro de 2025</p>
        <p className="text-lg">Bem-vindo(a) ao Di Maior CV Starter!</p>
      </div>

      <div className="space-y-6">
        <p>
          Estes Termos de Uso regulam a utilização do CV Starter e demais
          ferramentas disponibilizadas pela plataforma Di Maior. Ao acessar ou
          utilizar nossos serviços, você declara que leu, entendeu e concorda
          com estes Termos. Caso não concorde, recomendamos que não utilize o
          serviço.
        </p>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">1. Objeto do Serviço</h2>
          <p>
            O Di Maior CV Starter é uma ferramenta online de apoio à elaboração
            de currículos profissionais. Seu objetivo é auxiliar jovens e
            profissionais em início de carreira a estruturarem suas experiências
            em um modelo de resumo curricular mais claro, objetivo e adequado às
            práticas de mercado. O serviço tem caráter orientativo e não
            substitui consultoria de carreira, recrutamento ou processos de
            seleção.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">2. Público-Alvo e Restrições de Idade</h2>
          <p>
            O serviço é destinado a usuários a partir de 16 anos. Menores de 18
            anos devem utilizar a plataforma com ciência e consentimento de seus
            pais ou responsáveis. Ao utilizar o serviço, você declara possuir a
            idade mínima ou estar autorizado por seu responsável legal.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">3. Coleta e Uso de Dados</h2>
          <p>
            Para gerar o currículo, poderão ser solicitados dados como nome,
            contato, formações, experiências profissionais, habilidades e
            objetivos. Esses dados são utilizados exclusivamente para criação e
            personalização do currículo. O tratamento dos dados segue nossa
            Política de Privacidade, que integra estes Termos.
          </p>
          <h3 className="text-primary text-lg font-medium">3.1. Uso de Inteligência Artificial</h3>
          <p>
            O CV Starter poderá utilizar modelos de inteligência artificial para
            auxiliar na redação de partes do currículo. O usuário é
            responsável por revisar e validar as informações antes de utilizá-las
            em processos seletivos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">4. Limitações do Serviço</h2>
          <p>
            O currículo gerado tem caráter informativo e de apoio. Não há
            garantia de aprovação em processos seletivos, obtenção de emprego ou
            aceitação por sistemas de recrutamento (ATS). A responsabilidade
            final pelos dados apresentados é exclusiva do usuário.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">5. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo da plataforma (design, textos, gráficos, marca e
            logotipo) é de propriedade do Di Maior e protegido pela legislação
            aplicável. É proibida a reprodução, redistribuição ou uso comercial
            sem autorização prévia.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">6. Conduta do Usuário</h2>
          <p>
            Ao utilizar o CV Starter, você se compromete a:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Não inserir informações falsas ou de terceiros sem autorização;</li>
            <li>Não utilizar a ferramenta para fins ilícitos ou não autorizados;</li>
            <li>Não tentar acessar ou modificar códigos e sistemas da plataforma.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">7. Lei Aplicável e Foro</h2>
          <p>
            Estes Termos são regidos pelas leis da República Federativa do
            Brasil. Quaisquer disputas serão resolvidas no foro da comarca do
            Rio de Janeiro/RJ.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">8. Contato</h2>
          <p>
            Em caso de dúvidas ou solicitações, entre em contato pelo e-mail:
            <a
              href="mailto:contato@dimaior.com.br"
              className="text-blue-600 hover:underline ml-1"
            >
              contato@dimaior.com.br
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}