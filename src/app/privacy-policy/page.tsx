export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 max-sm:p-5 py-8 max-sm:py-7 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-primary text-3xl font-bold">
          Política de Privacidade – Di Maior CV Starter
        </h1>
        <p className="text-sm">Última atualização: setembro de 2025</p>
      </div>

      <div className="space-y-6">
        <p>
          O Di Maior respeita sua privacidade e está comprometido com a proteção
          dos seus dados pessoais. Esta Política explica como coletamos, usamos
          e armazenamos suas informações ao utilizar o CV Starter.
        </p>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">
            1. Dados Coletados
          </h2>
          <p>Durante o uso do CV Starter, poderemos coletar:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Dados fornecidos pelo usuário: nome, contato, formação,
              experiências, habilidades.
            </li>
            <li>
              Dados técnicos: endereço IP, navegador, dispositivo utilizado.
            </li>
            <li>
              Dados de uso: interações com a plataforma, páginas visitadas.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">
            2. Finalidade do Uso
          </h2>
          <p>Os dados são utilizados para:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Gerar e personalizar currículos;</li>
            <li>Melhorar a experiência do usuário;</li>
            <li>
              Enviar comunicações relacionadas ao serviço (quando autorizado);
            </li>
            <li>Garantir a segurança e funcionamento da plataforma.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">
            3. Compartilhamento de Dados
          </h2>
          <p>
            Não vendemos nem comercializamos seus dados. Podemos compartilhar
            informações somente com:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Provedores de serviços de nuvem e processamento de dados;</li>
            <li>
              Modelos de IA integrados à plataforma para auxiliar na criação de
              currículos;
            </li>
            <li>Autoridades, quando houver exigência legal.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">
            4. Direitos do Usuário
          </h2>
          <p>Você pode solicitar a qualquer momento:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Acesso e retificação dos seus dados;</li>
            <li>Exclusão (direito ao esquecimento);</li>
            <li>Portabilidade;</li>
            <li>Revogação de consentimento.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">
            5. Armazenamento e Segurança
          </h2>
          <p>
            Os dados são armazenados em servidores seguros e adotamos medidas
            técnicas para protegê-los contra acesso não autorizado, alteração ou
            destruição.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">
            6. Alterações nesta Política
          </h2>
          <p>
            A Política poderá ser atualizada a qualquer momento. Alterações
            significativas serão comunicadas em nosso site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-primary text-xl font-semibold">7. Contato</h2>
          <p>
            Para dúvidas ou solicitações relacionadas à privacidade, entre em
            contato pelo e-mail:
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
