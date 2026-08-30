# Burkina Faso

**ISO code:** `bf` · **Region:** Western Africa (UN M49)
**Researched by:** Tumo Olorato Mogame · **Last updated:** 2026-08-30
**Status:** long-form research carried in · languages and anthem outstanding

> **How this file is put together.** Same shape as [Botswana](bw-botswana.md). The research is
> Tumo's, and the narrative in [The full research report](#the-full-research-report) is carried
> across **verbatim** — nothing has been reworded. What was added is the structure: the summary
> sections below are built only from claims made in that narrative, each pointing back at the
> section it came from, and the 14 references at the bottom were reformatted from a browser paste.
>
> ⚠️ **Two honest limitations, and the second one is serious.**
>
> 1. The original report carried inline citation markers and they were lost in the paste. Claims are
>    therefore traceable to the **source list as a whole**, not one by one. Before any of this becomes
>    something the app *says*, a specific claim has to point at a specific source — that is the
>    integrity rule ([AGENTS.md §4](../AGENTS.md)), and it is not satisfied yet.
> 2. The source list is **thin and uneven**: 14 references against Botswana's 66. Three are Wikipedia,
>    one is Scribd, and **one is a Reddit alternate-history mapping community** — `r/imaginarymaps`,
>    *"Lines in the Sand (French African Civil War)"*, a forum whose entire purpose is publishing
>    **invented** maps and histories. Whatever it contributed has to be found and removed, not merely
>    down-weighted. See [Open questions](#open-questions).

**What the app already has for Burkina Faso:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/bf.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `bf` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — the picker falls back to the full list |
| Heritage cards | ❌ none. [`totems.ts`](../app/src/content/totems.ts) is Southern African, and the report names no Burkinabé totem system |

---

## Languages

*Would feed [`app/src/content/country-languages.ts`](../app/src/content/country-languages.ts) — but
see the blocker at the end of this section. It cannot yet.*

The report is a political history, not a language survey. It names languages only where they carry
the story, and it names **peoples** far more often than it names their languages. What follows is
only what the narrative actually establishes.

| Language | What the report establishes | Also spoken in SA? | From |
|---|---|---|---|
| Mooré (Mossi) | Supplies *Burkina* — "upright" or "honest" — in the country's name. The language of the ~52% Mossi majority. | No | § *Colonial Subjugation*, § *Part I* |
| Dioula | Supplies *Faso* — "fatherland" — in the country's name. | No | § *Colonial Subjugation* |
| Fulani | The report credits *Burkinabé* with "a Fulani linguistic suffix" but **never names the language itself**. Spoken by the ~8.4% Fulani (Peul/Fulbe). | No | § *Colonial Subjugation*, § *Part I* |
| Berber (Tuareg) | The northern Sahel Tuareg are described as "Berber-speaking". No specific language is named. | No | § *Part I* |
| French | Given **no status at all**. The report establishes only the colonial relationship — conquest in 1896, the colony of Upper Volta in 1919 — and Sankara's 1984 severing of "the French imperial legacy". | No — Ubuntu Heritage does not speak French either | § *Colonial Subjugation* |

**Official-language instrument:** `[NEEDS SOURCE]`. The report never says which languages are
official or national, or under what instrument. Do not fill this in from memory: read the
constitution currently in force rather than an encyclopaedia summary of it.

**Languages Ubuntu Heritage does not have:** *all of them.* Mooré, Dioula, Fulani, Berber/Tuareg —
and French.

**Peoples named without their languages.** The report names the Gourmantché, Bobo, Lobi, Gurunsi and
Sénoufo as peoples (§ *Part I*) and says nothing about what they speak. A people's name is not a
language's name, and guessing the mapping is exactly the "same name ≠ same language" trap
[README.md](README.md) warns about. Left blank on purpose.

**The blocker this country exposes — worth reading even if you skip the rest.** Botswana could be
wired into `country-languages.ts` because Ubuntu Heritage speaks Setswana. Burkina Faso speaks
**nothing the app speaks**, and the file has no way to say so: `lead` is a required `LangCode`, which
means one of the eleven South African languages, and `supported` would be empty. So `bf` cannot be
added at all — not because the research is missing, but because the data structure has no shape for
*"we speak none of what is spoken here."* This is the first researched country where that is the
honest answer, and it will be the answer for most of the 54. **That shape has to be designed before
LANG-03 ([specs/tasks.md](../specs/tasks.md)) can move past Southern Africa.** Until then the
fallback — the flat language list — is the correct behaviour, not a bug.

---

## National anthem

- **Title (own language):** `[NEEDS SOURCE]`
- **Title (English):** `[NEEDS SOURCE]`
- **Adopted:** `[NEEDS SOURCE]`
- **Words / music by:** `[NEEDS SOURCE]`
- **Recording we could use:** none found yet
- **Source:** `[NEEDS SOURCE]`

> The report does not mention the anthem. As with Botswana, this is the section `/countries` would
> use first and the one that is genuinely empty.

---

## Milestones

*Every row is drawn from the narrative; the last column says where. One carries a health warning —
see the framing notes.*

| Year | Milestone | One grounded line | From |
|---|---|---|---|
| from 14,000 BC | Continuous habitation | Neolithic tools and the Loropéni excavations indicate unbroken human presence from hunter-gatherers onward. | § *Part I* |
| by 1200 BC | Iron smelting ⚠️ | The report states that sub-Saharan Africa had developed advanced iron smelting by this date. A continental claim inside a national report, and a contested date — see the framing note. | § *Part I* |
| 3rd–13th c. AD | The Bura culture | A complex Iron Age civilisation spanning south-eastern Burkina Faso and south-western Niger. | § *Part I* |
| 11th–15th c. | The Mossi states emerge | Yennenga's son Ouedraogo conquers the Volta River basin and builds Tenkodogo, the first Mossi kingdom. | § *Ethnogenesis* |
| 14th–15th c. | Mossi cavalry raid Timbuktu | They repel the expansionist ambitions of both the Mali and Songhai empires, and hold off Islamic proselytisation far longer than their Sahelian neighbours. | § *Ethnogenesis* |
| 15th–16th c. | Loropéni and the gold trade | The site is crucial to the Saharan gold trade in this period; it is today a World Heritage site. | § *Part I* |
| 1896 | The French take Ouagadougou | French forces with industrial weaponry force the Mogho Naaba to accept protectorate status. | § *Colonial Subjugation* |
| 1919 | Upper Volta | The territory is formally consolidated into the French colony of Haute-Volta. | § *Colonial Subjugation* |
| 1932 | The colony is dismembered | Upper Volta is partitioned between Côte d'Ivoire, Niger and French Sudan, before later being reconstituted. | § *Colonial Subjugation* |
| 1939–1945 | The Tirailleurs Sénégalais | Heavily exploited for labour, the Mossi simultaneously form the backbone of the French colonial military in West Africa during the Second World War. | § *Colonial Subjugation* |
| 1960 | Independence | Upper Volta becomes independent; the decades that follow are marked by underdevelopment and repeated military coups. | § *Colonial Subjugation* |
| 1983 | Sankara takes power | A coalition of left-wing officers, trade unionists and intellectuals seizes power under Captain Thomas Sankara. | § *Colonial Subjugation* |
| 1984 | The country renames itself | *Burkina* (Mooré, "upright") + *Faso* (Dioula, "fatherland") — a name deliberately assembled out of the country's own languages to sever the French imperial legacy. | § *Colonial Subjugation* |
| 1987 | Sankara assassinated | Killed in a coup led by Blaise Compaoré, after a presidency the report itself describes as having grown increasingly authoritarian. | § *Colonial Subjugation* |

**Framing notes** — what has to be handled carefully if any of this ships:

- **The 1200 BC iron-smelting line is a continental claim inside a national report, and the dating is
  contested.** It is also the most quotable sentence in the narrative, and so the one most likely to
  be lifted into app copy. Do not lift it until it rests on an archaeological source of its own.
- **Yennenga is oral tradition, and the report says so** — "according to historical legend". Presented
  as settled fact she becomes invented heritage; presented as what the Mossi carry, she is one of the
  great foundational epics, and unusually it is a *woman's* flight on horseback that founds the state.
  Tell it the way the community tells it.
- **The Mossi conquered the people already there.** The report is explicit about the *Nakomsé* /
  *Tengbiise* split — a royal class descended from Ouedraogo, and "the descendants of the subjugated
  aboriginals" who kept spiritual authority over the land through the *Tengsobda*, the Earth Priests.
  This is the same refusal of a clean resistance-only story that Botswana's *botlhanka* note makes.
  Both belong; neither is optional.
- **Sankara is not a saint in this file and should not become one in the app.** The report gives him
  the mass vaccinations, the female emancipation and the public bank accounts *and* the growing
  authoritarianism. "Africa's Che Guevara" is the report's phrase — a comparison, not a fact.
- **"Land of Upright Men."** The report's own English rendering. If this goes in front of a child, say
  what the name *does* — three of the country's languages fused into one word, Mooré + Dioula + a
  Fulani suffix — rather than repeating a translation that quietly narrows who it includes.

---

## Peoples & cultures

- **The demography** — Mossi ~52%, Fulani ~8.4%, Gourmantché ~7.0%, Bobo ~4.9%, Gurunsi ~4.6%,
  Sénoufo ~4.5%, Lobi ~2.4%, plus the Berber-speaking Tuareg of the northern Sahel. Full table in
  § *Part I*.
- **Mossi political structure** — the *Nakomsé* (royal class, holders of *naam*, the divine right to
  rule) above the *Tengbiise* / *Nyonyosé* (descendants of the conquered, who retained spiritual
  authority over the land through the *Tengsobda*, Earth Priests). At the apex, the **Mogho Naaba**,
  Emperor of Ouagadougou, "King of All the World". § *Ethnogenesis*
- **The founding epic** — Princess Yennenga flees the court of her father Naa Gbewaa (or Nedega) in
  the Mamprusi kingdom on horseback; her son by the Mandé elephant hunter Rialé is named
  **Ouedraogo**, "stallion", for the horse that carried her to freedom. Legend, not chronicle.
  § *Ethnogenesis*
- **The confederation** — Tenkodogo, Yatenga, Fada N'gourma, Zondoma, and Ouagadougou as central
  hegemon: distinct kingdoms, culturally unified. § *Ethnogenesis*
- **Cavalry as statecraft** — mastery of horse warfare let the Mossi project power outward, raid
  Timbuktu and act as strategic intermediaries in regional trade rather than as anyone's periphery.
  § *Ethnogenesis*
- **Religious continuity** — ancestor veneration and royal shrines, held against Islamic
  proselytisation far longer than in neighbouring Sahelian states. § *Ethnogenesis*
- **Craft traditions named in passing** — Gourmantché initiation rites and masks; Sénoufo wood
  carving; Bobo and Gurunsi animist traditions. Named only; nothing described. § *Part I*

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| — | — | — | — | — |

**Genuinely empty, and that is the finding.** The report names no writer and no literary work. The
nearest thing it offers is Sankara's speeches and their influence on global anti-imperialist thought
— political oratory, not the literature this section is for. South Africa has Plaatje, Mqhayi, Mutwa
and Vilakazi in [docs/04](../docs/04-humanities-sources.md); the same question has not been asked of
Burkina Faso yet. Ask it without assuming the answer is a print canon: this is a country whose
founding story reaches us through oral tradition, and Ouagadougou's place in African cinema is
`[NEEDS SOURCE]` here but worth checking before concluding there are no voices to find.

---

## Heritage & sites

- **Loropéni** — a World Heritage site, crucial to the Saharan gold trade in the 15th–16th centuries;
  Neolithic tools found in the wider excavations. § *Part I*
- **Tenkodogo** — the city Ouedraogo built; the first Mossi kingdom. § *Ethnogenesis*
- **Ouagadougou** — seat of the Mogho Naaba and the central hegemon of the confederation; taken by
  France in 1896. § *Ethnogenesis*, § *Colonial Subjugation*
- **Yatenga, Fada N'gourma, Zondoma** — the other principal Mossi kingdoms. § *Ethnogenesis*
- **The Bura culture area** — south-eastern Burkina Faso into south-western Niger. § *Part I*

---

## Open questions

- [ ] **Find and remove whatever came from `r/imaginarymaps`.** One of the 14 sources is a Reddit
      alternate-history community that publishes invented maps and histories. Until it is known which
      claims it touched, any uncorroborated detail in the colonial section has to be treated as
      suspect. Highest-priority item in this file.
- [ ] **Which languages are official or national today, and under which instrument?** Unanswered by
      the report, and it is what the language picker would need first.
- [ ] **Name the Fulani language properly.** The report says "a Fulani linguistic suffix" without
      naming the language. Do not fill it in by inference.
- [ ] **What do the Gourmantché, Bobo, Lobi, Gurunsi and Sénoufo speak?** Peoples named, languages not.
- [ ] **The anthem.** Nothing at all, and it is what `/countries` needs first.
- [ ] **Source the 1200 BC iron-smelting claim independently**, or cut it.
- [ ] **Who are Burkina Faso's foundational writers — and is the canon written, oral, or filmed?**
- [ ] **Design a `country-languages.ts` shape for "we speak none of these."** Blocks `bf` and most of
      the remaining 52. See the blocker under [Languages](#languages).
- [ ] **Tie claims to individual sources.** Same limitation as Botswana; same rule.

---

## The full research report

### Statecraft, Identity, and Resilience in African Historiography: An Anthropological Analysis of Burkina Faso

*Tumo's research, carried across verbatim. Section headings and the demographic table were
reformatted; no wording was changed.*

### Introduction: The Geographic and Cultural Landscapes of Indigenous Sovereignty

The historiography of the African continent is frequently dominated by narratives of external conquest and post-colonial structural failure. However, a deep anthropological and historical examination of specific indigenous polities reveals a profound legacy of autonomous statecraft, diplomatic ingenuity, and cultural resilience. This report undertakes an exhaustive analysis of the West African nation of Burkina Faso—historically dominated by the highly stratified Mossi Kingdoms.

Burkina Faso is a landlocked, Sahelian and savanna-dominated territory heavily reliant on trans-Saharan and regional trade networks connecting it to Mali, Niger, Benin, Togo, Ghana, and Côte d'Ivoire. By examining the ethnogenesis, urban development, cosmological paradigms, and colonial resistance of the Mossi, this report illuminates the complex processes by which African societies have continuously redefined themselves, the painful histories of marginalized aboriginals that have frequently been obfuscated, and the mechanisms by which these indigenous cultures have influenced global anti-imperialist and human rights discourses.

### Part I: Burkina Faso – The Legacy of the Mossi and the Quest for the Upright State

Before it became the modern nation of Burkina Faso, the territory was home to sophisticated, decentralized societies and formidable centralized empires. Archaeological excavations at sites such as Loropeni (a World Heritage site crucial to the Saharan gold trade between the 15th and 16th centuries) and the discovery of Neolithic tools indicate continuous human habitation by hunter-gatherers from 14,000 BC. By 1200 BC, sub-Saharan Africa had developed advanced iron smelting, with the Bura culture establishing a complex Iron Age civilization spanning contemporary southeastern Burkina Faso and southwestern Niger from the 3rd to the 13th centuries AD.

The demographic landscape of modern Burkina Faso is highly diverse, reflecting successive waves of migration. While the population includes the nomadic, Berber-speaking Tuareg of the northern Sahel, the semi-nomadic Fulani (Peul/Fulbe) pastoralists, and agriculturalists like the Gourmantché, Bobo, Lobi, Gurunsi, and Sénoufo, the geopolitical history of the state is overwhelmingly dominated by the Mossi people.

| Ethnic Group | Estimated Demographic Share | Primary Cultural / Economic Signifiers |
|---|---|---|
| Mossi (Moose) | ~52% | Dominant political class, heirs to centralized kingdoms (Ouagadougou), agrarian economy. |
| Fulani (Fula) | ~8.4% | Nomadic/semi-nomadic pastoralists, cattle herding, predominantly Islamic. |
| Gourmantché | ~7.0% | Eastern agriculturalists (millet, sorghum), renowned for initiation rites and traditional masks. |
| Bobo / Gurunsi | ~4.9% / 4.6% | Early inhabitants, strong animist traditions, decentralized agricultural communities. |
| Sénoufo / Lobi | ~4.5% / 2.4% | Southwestern agriculturalists, known for wood carvings (Sénoufo) and fierce independence (Lobi). |

### The Ethnogenesis and Architecture of the Mossi Empire

The origins of the Mossi states, which emerged between the 11th and 15th centuries, represent one of the most compelling foundational epics in West African oral tradition, uniquely anchored by female martial agency. According to historical legend, the ethnogenesis of the Mossi stems from a dynastic dispute within the Mamprusi kingdom of modern-day northern Ghana. Princess Yennenga, a celebrated warrior and daughter of King Naa Gbewaa (or Nedega), fled her father’s court on horseback, rejecting his refusal to allow her to marry. Deep in the wilderness, she encountered a solitary Mandé elephant hunter named Rialé. Their union produced a son named Ouedraogo, meaning "stallion," honoring the horse that carried Yennenga to freedom.

Ouedraogo returned to his grandfather’s kingdom, acquired a cavalry force, and conquered the indigenous populations of the Volta River basin, building the city of Tenkodogo and establishing the first Mossi kingdom. His sons and descendants expanded this territory, creating a confederation of distinct but culturally unified kingdoms, the most prominent being Tenkodogo, Yatenga, Fada N'gourma, Zondoma, and the central hegemon, Ouagadougou.

The Mossi state was highly stratified. It distinguished between the Nakomsé (the royal class claiming direct lineage to Ouedraogo and possessing naam, the divine right to rule) and the Tengbiise or Nyonyosé (the descendants of the subjugated aboriginals, who retained spiritual authority over the land through Earth Priests known as Tengsobda). At the apex of this political hierarchy sat the Mogho Naaba, the Emperor of Ouagadougou and the "King of All the World".

The military prowess of the Mossi kingdoms was predicated on their mastery of cavalry, allowing them to project power deep into neighboring territories. Operating as strategic intermediaries in regional trade, they fiercely defended their autonomy. Remarkably, the Mossi cavalry successfully raided Timbuktu and repelled the expansionist ambitions of both the mighty Mali and Songhai Empires in the 14th and 15th centuries. Furthermore, they mounted a robust ideological defense against Islamic proselytization, maintaining their indigenous religious practices—centered on ancestor veneration and royal shrines—far longer than their Sahelian neighbors.

### Colonial Subjugation and the Revolutionary Birth of Burkina Faso

The autonomy of the Mossi kingdoms endured for centuries until the violent intrusion of the French military during the "Scramble for Africa." In 1896, French forces equipped with superior industrial weaponry conquered the Mossi kingdom of Ouagadougou, forcing the Mogho Naaba to accept protectorate status. The region was formally consolidated into the French colony of Upper Volta (Haute-Volta) in 1919.

Under colonial rule, the geopolitical borders of Upper Volta were highly unstable, partitioned between Côte d'Ivoire, Niger, and French Sudan in 1932 before being reconstituted. The Mossi people were heavily exploited for labor, yet they simultaneously formed the backbone of the French colonial military apparatus in West Africa, contributing significantly to the Tirailleurs Sénégalais during World War II.

Upper Volta achieved independence in 1960, but the subsequent decades were marred by profound underdevelopment, poverty, and political instability characterized by repetitive military coups. This trajectory was radically altered in 1983 when a coalition of left-wing military officers, trade unionists, and intellectuals seized power, led by Captain Thomas Sankara.

Sankara fundamentally sought to decolonize the psychological and economic infrastructure of the nation. In 1984, to symbolically sever ties with the French imperial legacy, he renamed the country "Burkina Faso". The new name was a masterful exercise in ethno-linguistic integration: Burkina is a Mooré (Mossi) word meaning "upright" or "honest," and Faso is a Dioula word meaning "fatherland". Consequently, Burkina Faso translates to the "Land of Upright Men," and its citizens are known as Burkinabé, incorporating a Fulani linguistic suffix.

Sankara’s administration launched aggressive socialist reforms, prioritizing agrarian self-sufficiency, mass vaccination, female emancipation, and anti-corruption, while famously forcing government officials to open their bank accounts to public scrutiny. Though his regime grew increasingly authoritarian before his assassination in 1987 in a coup led by Blaise Compaoré, Sankara's legacy as "Africa’s Che Guevara" profoundly influenced global anti-imperialist thought, establishing the Burkinabé identity as one rooted in radical dignity.

### Conclusion: Trajectories of Decolonization and Identity

The historical trajectory of Burkina Faso illustrates the profound complexities of state formation, indigenous resistance, and the lingering scars of imperial cartography. The Mossi developed a highly organized, centralized, and industrialized society long before the arrival of European colonizers. Through military prowess, such as the Mossi cavalry repelling the Songhai Empire, they established a legacy of fierce sovereignty.

However, the colonial era drastically altered their destinies. The Mossi found their ancient authority subjugated under French rule, leading to a modern state that required the revolutionary vision of Thomas Sankara to reclaim its psychological independence and forge the upright identity of Burkina Faso.

The history of the Mossi is a testament to the fact that African cultures are not static monoliths; they are dynamic, evolving forces that have utilized their rich linguistic, theological, and socio-political frameworks to survive colonialism, shape global anti-imperialist discourse, and continuously negotiate the painful realities of modernization.

---

## Sources

*The 14 references from the original report, reformatted from a browser paste — the repeated "Opens
in a new window" lines were dropped, nothing else was changed. See the limitation at the top: these
support the report as a whole, not claim by claim.*

1. Burkina Faso: History, Culture, Education, and Development — `positivelearningsuccess.org`
2. History of Burkina Faso | Events, People, Dates, & Facts - Britannica — `britannica.com`
3. Burkina Faso | Encyclopedia.com — `encyclopedia.com`
4. Burkina Faso - Wikipedia — `en.wikipedia.org`
5. Burkina Faso — History and Culture - iExplore — `iexplore.com`
6. BURKINA FASO - Encyclopaedia Africana — `encyclopaediaafricana.com`
7. Mossi (Moose) Tribe: Culture, Names, History & Traditions — `tribeguess.com`
8. Mossi people - Wikipedia — `en.wikipedia.org`
9. Mossi (people) | Language and Linguistics | Research Starters — `ebsco.com`
10. Mossi Kingdoms - Wikipedia — `en.wikipedia.org`
11. Mossi people - AFRICA | 101 Last Tribes — `101lasttribes.com`
12. Research Brief - Burkina Faso — `meari.org`
13. ⚠️ **Do not use.** Lines in the Sand (French African Civil War) : r/imaginarymaps — `reddit.com`
14. Twentieth Century African Conflicts | PDF | British Empire | Africa — `scribd.com`

**Source-quality note.** Ranked honestly, because the app will one day assert some of this to a child:

- **Usable as they stand** — Britannica (2), Encyclopaedia Africana (6), EBSCO Research Starters (9).
  Named, edited, checkable.
- **Fine for orientation, not for assertion** — the three Wikipedia entries (4, 8, 10),
  Encyclopedia.com (3) and the MEARI brief (12). Good for finding the primary source; not the source.
- **Weak** — iExplore (5) is travel copy, 101 Last Tribes (11) and TribeGuess (7) are hobbyist
  ethnography pages of unclear authorship, Scribd (14) is an upload of unknown provenance, and
  positivelearningsuccess.org (1) is unidentified.
- **Disqualifying** — (13) `r/imaginarymaps` is a community for **fictional** alternate-history maps.
  It is not a weak source; it is a source of invented history sitting in a file whose one rule is
  that nothing is invented. Nothing may rest on it, and the first job on this file is working out
  what did.

Botswana carries 66 references for a comparable amount of narrative. This file carries 14. That gap
is the honest measure of how far Burkina Faso still is from being something Ubuntu Heritage can speak
about out loud.
