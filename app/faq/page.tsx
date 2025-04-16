import Link from "next/link"
import { ChevronDown, Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Odiyoo</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Functies
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Hoe het werkt
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Getuigenissen
            </Link>
            <Link href="/faq" className="text-sm font-medium text-foreground">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/quote" className="hidden md:block">
              <Button>Directe Offerte</Button>
            </Link>
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Inloggen
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Veelgestelde vragen</h1>
              <p className="text-lg text-muted-foreground">
                Vind antwoorden op de meest gestelde vragen over dakoffertes en onze diensten.
              </p>
              <div className="relative max-w-xl mx-auto mt-8">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Zoek in veelgestelde vragen..."
                  className="pl-10 pr-4 py-6 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Algemene vragen</CardTitle>
                  <CardDescription>Basisinformatie over onze diensten</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#algemeen-1" className="text-primary hover:underline">
                        Hoe werkt het offerteproces?
                      </Link>
                    </li>
                    <li>
                      <Link href="#algemeen-2" className="text-primary hover:underline">
                        Hoe lang duurt het om een offerte te krijgen?
                      </Link>
                    </li>
                    <li>
                      <Link href="#algemeen-3" className="text-primary hover:underline">
                        Zijn jullie offertes bindend?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Dakmaterialen</CardTitle>
                  <CardDescription>Informatie over verschillende materialen</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#materialen-1" className="text-primary hover:underline">
                        Welk dakmateriaal is het beste voor mij?
                      </Link>
                    </li>
                    <li>
                      <Link href="#materialen-2" className="text-primary hover:underline">
                        Wat is het verschil tussen de materialen?
                      </Link>
                    </li>
                    <li>
                      <Link href="#materialen-3" className="text-primary hover:underline">
                        Hoe lang gaan verschillende dakmaterialen mee?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Prijzen & Offertes</CardTitle>
                  <CardDescription>Informatie over kosten en prijzen</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#prijzen-1" className="text-primary hover:underline">
                        Hoe worden de prijzen berekend?
                      </Link>
                    </li>
                    <li>
                      <Link href="#prijzen-2" className="text-primary hover:underline">
                        Zijn er verborgen kosten?
                      </Link>
                    </li>
                    <li>
                      <Link href="#prijzen-3" className="text-primary hover:underline">
                        Kan ik de offerte aanpassen?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Aannemers</CardTitle>
                  <CardDescription>Informatie over onze dakdekkers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#aannemers-1" className="text-primary hover:underline">
                        Hoe kies ik de juiste aannemer?
                      </Link>
                    </li>
                    <li>
                      <Link href="#aannemers-2" className="text-primary hover:underline">
                        Wat betekent faillissementsbescherming?
                      </Link>
                    </li>
                    <li>
                      <Link href="#aannemers-3" className="text-primary hover:underline">
                        Zijn alle aannemers gecertificeerd?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Extra diensten</CardTitle>
                  <CardDescription>Informatie over aanvullende diensten</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#extras-1" className="text-primary hover:underline">
                        Zijn extra's noodzakelijk?
                      </Link>
                    </li>
                    <li>
                      <Link href="#extras-2" className="text-primary hover:underline">
                        Hoeveel kan ik besparen met dakisolatie?
                      </Link>
                    </li>
                    <li>
                      <Link href="#extras-3" className="text-primary hover:underline">
                        Wat is de terugverdientijd van zonnepanelen?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Technische vragen</CardTitle>
                  <CardDescription>Informatie over technische aspecten</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#technisch-1" className="text-primary hover:underline">
                        Hoe wordt mijn dakgrootte berekend?
                      </Link>
                    </li>
                    <li>
                      <Link href="#technisch-2" className="text-primary hover:underline">
                        Wat als ik mijn adres niet kan vinden?
                      </Link>
                    </li>
                    <li>
                      <Link href="#technisch-3" className="text-primary hover:underline">
                        Hoe nauwkeurig zijn de metingen?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Algemene vragen</h2>

              <div id="algemeen-1" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoe werkt het offerteproces?</h3>
                </div>
                <p className="text-muted-foreground">
                  Ons offerteproces is eenvoudig en snel. U vult het online formulier in met uw adres en dakgegevens,
                  selecteert uw voorkeuren voor materialen en eventuele extra diensten, en ontvangt direct een offerte
                  van verschillende aannemers. U kunt vervolgens de aannemer kiezen die het beste bij uw wensen en
                  budget past.
                </p>
              </div>

              <div id="algemeen-2" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoe lang duurt het om een offerte te krijgen?</h3>
                </div>
                <p className="text-muted-foreground">
                  U ontvangt uw offerte direct na het invullen van het formulier. Ons geavanceerde algoritme berekent de
                  kosten op basis van uw specifieke wensen en gegevens. Het hele proces duurt slechts enkele minuten.
                </p>
              </div>

              <div id="algemeen-3" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Zijn jullie offertes bindend?</h3>
                </div>
                <p className="text-muted-foreground">
                  De online offertes zijn een nauwkeurige schatting, maar niet bindend. Voor een definitieve offerte zal
                  de gekozen aannemer een inspectie ter plaatse uitvoeren om de exacte situatie te beoordelen. Pas na
                  deze inspectie ontvangt u een bindende offerte.
                </p>
              </div>

              <Separator className="my-10" />

              <h2 className="text-2xl font-bold mb-8">Dakmaterialen</h2>

              <div id="materialen-1" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Welk dakmateriaal is het beste voor mij?</h3>
                </div>
                <p className="text-muted-foreground">
                  Het beste dakmateriaal hangt af van verschillende factoren, zoals uw budget, de stijl van uw woning,
                  het klimaat in uw regio en uw persoonlijke voorkeuren. Asfalt shingles zijn kosteneffectief en
                  veelzijdig, metalen daken zijn duurzaam en energiezuinig, dakpannen bieden een klassieke uitstraling,
                  en leisteen is premium maar heeft de langste levensduur. Onze aannemers kunnen u adviseren over de
                  beste optie voor uw specifieke situatie.
                </p>
              </div>

              <div id="materialen-2" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Wat is het verschil tussen de materialen?</h3>
                </div>
                <p className="text-muted-foreground">
                  De belangrijkste verschillen tussen dakmaterialen zijn levensduur, kosten, uiterlijk en
                  onderhoudseisen:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Asfalt shingles: 15-30 jaar levensduur, goedkoop, gemakkelijk te installeren</li>
                  <li>Metalen daken: 50+ jaar levensduur, energiezuinig, duurder dan asfalt</li>
                  <li>Dakpannen: 50+ jaar levensduur, klassieke uitstraling, zwaarder en duurder</li>
                  <li>Leisteen: 100+ jaar levensduur, premium uitstraling, hoogste kosten</li>
                </ul>
              </div>

              <div id="materialen-3" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoe lang gaan verschillende dakmaterialen mee?</h3>
                </div>
                <p className="text-muted-foreground">De levensduur van dakmaterialen varieert aanzienlijk:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Asfalt shingles: 15-30 jaar</li>
                  <li>Metalen daken: 50-70 jaar</li>
                  <li>Dakpannen: 50-100 jaar</li>
                  <li>Leisteen: 100+ jaar</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  De daadwerkelijke levensduur hangt af van factoren zoals klimaat, onderhoud en installatie.
                </p>
              </div>

              <Separator className="my-10" />

              <h2 className="text-2xl font-bold mb-8">Prijzen & Offertes</h2>

              <div id="prijzen-1" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoe worden de prijzen berekend?</h3>
                </div>
                <p className="text-muted-foreground">
                  Onze prijzen worden berekend op basis van verschillende factoren:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Dakgrootte (m²)</li>
                  <li>Gekozen dakmateriaal</li>
                  <li>Complexiteit van het dak (hellingsgraad, vorm)</li>
                  <li>Huidige staat van het dak</li>
                  <li>Geselecteerde extra diensten</li>
                  <li>Arbeidskosten van de gekozen aannemer</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Ons algoritme combineert al deze factoren om een nauwkeurige prijsschatting te geven.
                </p>
              </div>

              <div id="prijzen-2" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Zijn er verborgen kosten?</h3>
                </div>
                <p className="text-muted-foreground">
                  Nee, wij streven naar volledige transparantie in onze offertes. Alle kosten worden duidelijk
                  uitgesplitst, inclusief materialen, arbeid, extra's en BTW. Mocht er tijdens de inspectie ter plaatse
                  blijken dat er onvoorziene werkzaamheden nodig zijn, dan zal de aannemer dit met u bespreken voordat
                  er extra kosten worden gemaakt.
                </p>
              </div>

              <div id="prijzen-3" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Kan ik de offerte aanpassen?</h3>
                </div>
                <p className="text-muted-foreground">
                  Ja, u kunt uw offerte aanpassen door terug te gaan in het offerteproces en andere opties te
                  selecteren. U kunt experimenteren met verschillende materialen, extra diensten of aannemers om te zien
                  hoe dit de prijs beïnvloedt. Na de inspectie ter plaatse kunt u ook met de aannemer overleggen over
                  aanpassingen aan de definitieve offerte.
                </p>
              </div>

              <Separator className="my-10" />

              <h2 className="text-2xl font-bold mb-8">Aannemers</h2>

              <div id="aannemers-1" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoe kies ik de juiste aannemer?</h3>
                </div>
                <p className="text-muted-foreground">
                  Bij het kiezen van een aannemer kunt u letten op verschillende factoren:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Beoordelingen en recensies van andere klanten</li>
                  <li>Ervaring en specialisatie in het type dak dat u wilt</li>
                  <li>Garantievoorwaarden</li>
                  <li>Beschikbaarheid</li>
                  <li>Prijs-kwaliteitverhouding</li>
                  <li>Faillissementsbescherming</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Wij tonen al deze informatie in onze vergelijking, zodat u een weloverwogen keuze kunt maken.
                </p>
              </div>

              <div id="aannemers-2" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Wat betekent faillissementsbescherming?</h3>
                </div>
                <p className="text-muted-foreground">
                  Faillissementsbescherming betekent dat uw aanbetaling en garantie beschermd zijn, zelfs als de
                  aannemer failliet zou gaan. Aannemers met faillissementsbescherming zijn aangesloten bij een
                  garantiefonds dat ervoor zorgt dat uw project wordt afgemaakt door een andere aannemer als de
                  oorspronkelijke aannemer niet meer kan werken. Dit biedt u extra zekerheid en bescherming voor uw
                  investering.
                </p>
              </div>

              <div id="aannemers-3" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Zijn alle aannemers gecertificeerd?</h3>
                </div>
                <p className="text-muted-foreground">
                  Ja, alle aannemers in ons netwerk zijn gecertificeerd en voldoen aan strenge kwaliteitseisen. Wij
                  controleren hun licenties, verzekeringen, certificeringen en werkhistorie voordat ze worden toegelaten
                  tot ons platform. Daarnaast monitoren we continu de klanttevredenheid om ervoor te zorgen dat onze
                  aannemers blijven voldoen aan onze hoge standaarden.
                </p>
              </div>

              <Separator className="my-10" />

              <h2 className="text-2xl font-bold mb-8">Extra diensten</h2>

              <div id="extras-1" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Zijn extra's noodzakelijk?</h3>
                </div>
                <p className="text-muted-foreground">
                  Extra diensten zoals dakisolatie, nieuwe dakgoten of zonnepanelen zijn niet strikt noodzakelijk voor
                  een dakvervanging, maar kunnen wel aanzienlijke voordelen bieden. Het combineren van deze
                  werkzaamheden met uw dakproject kan kostenefficiënter zijn dan ze later apart te laten uitvoeren. De
                  noodzaak hangt af van de staat van uw huidige voorzieningen en uw wensen op het gebied van comfort,
                  energiebesparing en duurzaamheid.
                </p>
              </div>

              <div id="extras-2" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoeveel kan ik besparen met dakisolatie?</h3>
                </div>
                <p className="text-muted-foreground">
                  Met goede dakisolatie kunt u jaarlijks ongeveer 15-25% besparen op uw verwarmingskosten. Voor een
                  gemiddelde woning kan dit neerkomen op €300-€500 per jaar, afhankelijk van uw energieverbruik en de
                  huidige isolatiewaarde. Daarnaast verhoogt dakisolatie het comfort in uw woning door
                  temperatuurschommelingen te verminderen en tocht te voorkomen. De terugverdientijd van dakisolatie
                  ligt meestal tussen de 5 en 8 jaar.
                </p>
              </div>

              <div id="extras-3" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Wat is de terugverdientijd van zonnepanelen?</h3>
                </div>
                <p className="text-muted-foreground">
                  De gemiddelde terugverdientijd van zonnepanelen in Nederland ligt tussen de 6 en 9 jaar, afhankelijk
                  van factoren zoals:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>De oriëntatie en hellingshoek van uw dak</li>
                  <li>Het aantal zonuren in uw regio</li>
                  <li>Uw energieverbruik</li>
                  <li>De efficiëntie van de geïnstalleerde panelen</li>
                  <li>Beschikbare subsidies</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Na de terugverdientijd leveren de panelen nog 15-20 jaar gratis stroom op, wat resulteert in
                  aanzienlijke besparingen op de lange termijn.
                </p>
              </div>

              <Separator className="my-10" />

              <h2 className="text-2xl font-bold mb-8">Technische vragen</h2>

              <div id="technisch-1" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoe wordt mijn dakgrootte berekend?</h3>
                </div>
                <p className="text-muted-foreground">
                  Wij berekenen uw dakgrootte op basis van satellietbeelden en kadastrale gegevens. Ons algoritme
                  analyseert de contouren van uw dak en berekent de oppervlakte in vierkante meters. Deze methode is
                  nauwkeurig voor de meeste standaard daken. Voor complexe dakvormen of recent gebouwde woningen kan een
                  handmatige meting tijdens de inspectie ter plaatse nodig zijn voor een definitieve berekening.
                </p>
              </div>

              <div id="technisch-2" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Wat als ik mijn adres niet kan vinden?</h3>
                </div>
                <p className="text-muted-foreground">
                  Als uw adres niet automatisch wordt herkend, kunt u het handmatig invoeren. Mocht uw adres nog steeds
                  niet worden gevonden, dan kan dit verschillende oorzaken hebben: het pand is nieuw en nog niet
                  opgenomen in onze database, het adres is recent gewijzigd, of er is een technisch probleem. In dat
                  geval kunt u contact opnemen met onze klantenservice, die u verder zal helpen met het maken van een
                  offerte op basis van de door u verstrekte informatie.
                </p>
              </div>

              <div id="technisch-3" className="mb-8 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Hoe nauwkeurig zijn de metingen?</h3>
                </div>
                <p className="text-muted-foreground">
                  Onze dakmetingen op basis van satellietbeelden hebben een nauwkeurigheid van ongeveer 95% voor
                  standaard daken. Factoren die de nauwkeurigheid kunnen beïnvloeden zijn:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Complexe dakvormen met veel hoeken en niveauverschillen</li>
                  <li>Overhangende bomen die het dak gedeeltelijk verbergen</li>
                  <li>Recente wijzigingen aan het dak die nog niet zichtbaar zijn op de satellietbeelden</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Voor de definitieve offerte zal de aannemer altijd een nauwkeurige meting ter plaatse uitvoeren.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold">Nog vragen?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Neem contact op met onze klantenservice of vraag direct een offerte aan voor uw dakproject.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Contact opnemen
              </Button>
              <Link href="/quote">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  Offerte aanvragen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Company Banner */}
      <div className="bg-gray-100 py-4">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Odiyoo</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Dakoffertes eenvoudig, snel en nauwkeurig maken.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">We komen graag met je in contact</h3>
              <ul className="space-y-2">
                <li className="font-medium">Odiyoo N.V.</li>
                <li>BTW: BE 0123 456 789</li>
                <li>Email: info@odiyoo.nl</li>
                <li>Telefoon: (020) 123-4567</li>
                <li className="mt-4">
                  <span className="font-medium block">Openingstijden:</span>
                  <span className="block">Maandag - Vrijdag: 07.30 - 17.00</span>
                  <span className="block">Zaterdag: 08.00 - 12.30</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Over ons</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/over-ons" className="hover:text-white">
                    Ons team
                  </Link>
                </li>
                <li>
                  <Link href="/advies" className="hover:text-white">
                    Advies
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Algemene voorwaarden
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacybeleid
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Klantenservice</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/over-ons" className="hover:text-white">
                    Over ons
                  </Link>
                </li>
                <li>
                  <Link href="/advies" className="hover:text-white">
                    Advies
                  </Link>
                </li>
                <li>
                  <Link href="/klantenservice" className="hover:text-white">
                    Klantenservice
                  </Link>
                </li>
                <li>
                  <Link href="/kennisbank" className="hover:text-white">
                    Kennisbank
                  </Link>
                </li>
                <li>
                  <Link href="/vakantie-openingstijden" className="hover:text-white">
                    Vakantie openingstijden
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Odiyoo. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
