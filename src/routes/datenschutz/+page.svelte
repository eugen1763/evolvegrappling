<script lang="ts">
    import { onMount } from 'svelte';
    import { initScrollAnimations } from "$lib/utils/scroll_animations";
    // @ts-ignore
    import BurgerMenu from "$lib/components/BurgerMenu.svelte";

    onMount(() => {
        const cleanupAnimations = initScrollAnimations();

        return () => {
            cleanupAnimations();
        };
    });
</script>

<div class="relative overflow-x-hidden">
  <!-- Burger Menu -->
  <BurgerMenu/>

  <!-- Main Content -->
  <section class="relative z-20 bg-gray-900 min-h-screen pt-20">
    <div class="container mx-auto px-6 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-8 text-center scroll-animate fade-in-up">
          Datenschutzerklärung
        </h1>
        
        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-200">
          <div class="text-gray-300 space-y-4">
            <p>Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert für die Geschäftsleitung der Evolve Grappling Maximilian Galle und Marius Pichler GBR. Eine Nutzung der Internetseiten der Evolve Grappling Maximilian Galle und Marius Pichler GBR ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern eine betroffene Person besondere Services unseres Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.</p>

            <p>Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in Übereinstimmung mit den für die Evolve Grappling Maximilian Galle und Marius Pichler GBR geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerklärung möchte unser Unternehmen die Öffentlichkeit über Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt.</p>

            <p>Die Evolve Grappling Maximilian Galle und Marius Pichler GBR hat als für die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz der über diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch können Internetbasierte Datenübertragungen grundsätzlich Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht gewährleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu übermitteln.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-400">
          <h2 class="text-2xl font-semibold text-white mb-6">1. Begriffsbestimmungen</h2>
          <div class="text-gray-300 space-y-4">
            <p>Die Datenschutzerklärung der Evolve Grappling Maximilian Galle und Marius Pichler GBR beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch für unsere Kunden und Geschäftspartner einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchten wir vorab die verwendeten Begrifflichkeiten erläutern.</p>

            <p>Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe:</p>

            <ul class="space-y-6 list-none">
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">a) personenbezogene Daten</h3>
                <p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person") beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert werden kann.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">b) betroffene Person</h3>
                <p>Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">c) Verarbeitung</h3>
                <p>Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">d) Einschränkung der Verarbeitung</h3>
                <p>Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre künftige Verarbeitung einzuschränken.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">e) Profiling</h3>
                <p>Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere, um Aspekte bezüglich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, persönlicher Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">f) Pseudonymisierung</h3>
                <p>Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen werden.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">g) Verantwortlicher oder für die Verarbeitung Verantwortlicher</h3>
                <p>Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise können die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">h) Auftragsverarbeiter</h3>
                <p>Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">i) Empfänger</h3>
                <p>Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabhängig davon, ob es sich bei ihr um einen Dritten handelt oder nicht. Behörden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten möglicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empfänger.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">j) Dritter</h3>
                <p>Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.</p>
              </li>
              <li>
                <h3 class="text-xl font-semibold text-white mb-2">k) Einwilligung</h3>
                <p>Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-600">
          <h2 class="text-2xl font-semibold text-white mb-6">2. Name und Anschrift des für die Verarbeitung Verantwortlichen</h2>
          <div class="text-gray-300 space-y-4">
            <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:</p>
            
            <div class="bg-gray-700 rounded p-4">
              <p>
                <strong>Evolve Grappling Maximilian Galle und Marius Pichler GBR</strong><br>
                Talblick 5a<br>
                42719 Solingen<br>
                Deutschland<br><br>
                Tel.: +4915735412788<br>
                E-Mail: info@evolvegrappling.de<br>
                Website: evolvegrappling.de
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-800">
          <h2 class="text-2xl font-semibold text-white mb-6">3. Erfassung von allgemeinen Daten und Informationen</h2>
          <div class="text-gray-300 space-y-4">
            <p>Die Internetseite der Evolve Grappling Maximilian Galle und Marius Pichler GBR erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden können die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.</p>

            <p>Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Evolve Grappling Maximilian Galle und Marius Pichler GBR keine Rückschlüsse auf die betroffene Person. Diese Informationen werden vielmehr benötigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung für diese zu optimieren, (3) die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gewährleisten sowie (4) um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden durch die Evolve Grappling Maximilian Galle und Marius Pichler GBR daher einerseits statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erhöhen, um letztlich ein optimales Schutzniveau für die von uns verarbeiteten personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-1000">
          <h2 class="text-2xl font-semibold text-white mb-6">4. Routinemäßige Löschung und Sperrung von personenbezogenen Daten</h2>
          <div class="text-gray-300 space-y-4">
            <p>Der für die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur für den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der für die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde.</p>

            <p>Entfällt der Speicherungszweck oder läuft eine vom Europäischen Richtlinien- und Verordnungsgeber oder einem anderen zuständigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-1200">
          <h2 class="text-2xl font-semibold text-white mb-6">5. Rechte der betroffenen Person</h2>
          <div class="text-gray-300 space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-white mb-3">a) Recht auf Bestätigung</h3>
              <p>Jede betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber eingeräumte Recht, von dem für die Verarbeitung Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. Möchte eine betroffene Person dieses Bestätigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-3">b) Recht auf Auskunft</h3>
              <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, jederzeit von dem für die Verarbeitung Verantwortlichen unentgeltliche Auskunft über die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-3">c) Recht auf Berichtigung</h3>
              <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-3">d) Recht auf Löschung (Recht auf Vergessen werden)</h3>
              <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der folgenden Gründe zutrifft und soweit die Verarbeitung nicht erforderlich ist.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-3">e) Recht auf Einschränkung der Verarbeitung</h3>
              <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen die Einschränkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-3">f) Recht auf Datenübertragbarkeit</h3>
              <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-3">g) Recht auf Widerspruch</h3>
              <p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten Widerspruch einzulegen.</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-1400">
          <h2 class="text-2xl font-semibold text-white mb-6">6. Datenschutzbestimmungen zu Einsatz und Verwendung von Instagram</h2>
          <div class="text-gray-300 space-y-4">
            <p>Der für die Verarbeitung Verantwortliche hat auf dieser Internetseite Komponenten des Dienstes Instagram integriert. Instagram ist ein Dienst, der als audiovisuelle Plattform zu qualifizieren ist und den Nutzern das Teilen von Fotos und Videos und zudem eine Weiterverbreitung solcher Daten in anderen sozialen Netzwerken ermöglicht.</p>

            <p>Betreibergesellschaft der Dienste von Instagram ist die Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2 Ireland.</p>

            <p>Weitere Informationen und die geltenden Datenschutzbestimmungen von Instagram können unter <a href="https://help.instagram.com/155833707900388" target="_blank" class="text-blue-400 hover:text-blue-300 underline">https://help.instagram.com/155833707900388</a> und <a href="https://www.instagram.com/about/legal/privacy/" target="_blank" class="text-blue-400 hover:text-blue-300 underline">https://www.instagram.com/about/legal/privacy/</a> abgerufen werden.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-1600">
          <h2 class="text-2xl font-semibold text-white mb-6">7. Datenschutzbestimmungen zu Einsatz und Verwendung von YouTube</h2>
          <div class="text-gray-300 space-y-4">
            <p>Der für die Verarbeitung Verantwortliche hat auf dieser Internetseite Komponenten von YouTube integriert. YouTube ist ein Internet-Videoportal, dass Video-Publishern das kostenlose Einstellen von Videoclips und anderen Nutzern die ebenfalls kostenfreie Betrachtung, Bewertung und Kommentierung dieser ermöglicht.</p>

            <p>Betreibergesellschaft von YouTube ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin, D04 E5W5, Ireland.</p>

            <p>Die von YouTube veröffentlichten Datenschutzbestimmungen, die unter <a href="https://www.google.de/intl/de/policies/privacy/" target="_blank" class="text-blue-400 hover:text-blue-300 underline">https://www.google.de/intl/de/policies/privacy/</a> abrufbar sind, geben Aufschluss über die Erhebung, Verarbeitung und Nutzung personenbezogener Daten durch YouTube und Google.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-1800">
          <h2 class="text-2xl font-semibold text-white mb-6">8. Rechtsgrundlage der Verarbeitung</h2>
          <div class="text-gray-300 space-y-4">
            <p>Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage für Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei Verarbeitungsvorgängen der Fall ist, die für eine Lieferung von Waren oder die Erbringung einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 I lit. b DS-GVO.</p>
            
            <p>Letztlich könnten Verarbeitungsvorgänge auf Art. 6 I lit. f DS-GVO beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorgänge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht überwiegen.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-2000">
          <h2 class="text-2xl font-semibold text-white mb-6">9. Berechtigte Interessen an der Verarbeitung</h2>
          <div class="text-gray-300">
            <p>Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser berechtigtes Interesse die Durchführung unserer Geschäftstätigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-2200">
          <h2 class="text-2xl font-semibold text-white mb-6">10. Dauer, für die die personenbezogenen Daten gespeichert werden</h2>
          <div class="text-gray-300">
            <p>Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-2400">
          <h2 class="text-2xl font-semibold text-white mb-6">11. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten</h2>
          <div class="text-gray-300">
            <p>Wir klären Sie darüber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verfügung stellt, die in der Folge durch uns verarbeitet werden müssen.</p>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-8 scroll-animate fade-in-up delay-2600">
          <h2 class="text-2xl font-semibold text-white mb-6">12. Bestehen einer automatisierten Entscheidungsfindung</h2>
          <div class="text-gray-300 space-y-4">
            <p>Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.</p>

            <p class="text-sm text-gray-400 border-t border-gray-600 pt-4 mt-6">
              Diese Datenschutzerklärung wurde durch den Datenschutzerklärungs-Generator der DGD Deutsche Gesellschaft für Datenschutz GmbH, die <a href="https://dg-datenschutz.de/datenschutz-dienstleistungen/datenschutz-audit/" target="_blank" class="text-blue-400 hover:text-blue-300 underline">Datenschutzaudits</a> durchführt, in Kooperation mit der <a href="https://www.wbs.legal/taetigkeitsgebiete/medienrecht/" target="_blank" class="text-blue-400 hover:text-blue-300 underline">Medienrechtskanzlei WILDE BEUGER SOLMECKE</a> erstellt.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-950 text-white py-12 scroll-animate fade-in-up">
    <div class="container mx-auto px-6 text-center">
      <h3 class="text-2xl font-bold mb-4">Evolve Grappling</h3>
      <div class="flex justify-center items-center space-x-6 text-gray-400">
        <div class="flex flex-col items-start space-x-6">
          <a href="/" class="hover:text-white transition-colors underline">Startseite</a>
          <a href="/impressum" class="hover:text-white transition-colors underline">Impressum</a>
        </div>
        <div class="h-8 w-px bg-gray-600"></div>
        <div class="text-left">
          <p class="text-sm">
            Talblick 5a<br>
            42719 Solingen
          </p>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
    /* Prevent any horizontal scroll caused by transforms, scrollbars, or blur effects */
    :global(html), :global(body) {
        overflow-x: hidden;
        width: 100%;
    }
</style>