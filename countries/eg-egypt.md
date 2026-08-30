# Egypt

**ISO code:** `eg` · **Region:** Northern Africa (UN M49)
**Researched by:** Tumo Olorato Mogame, with Claude · **Last updated:** 2026-08-30
**Status:** core research — languages, anthem, milestones, literature and heritage sourced

> **How this file is put together.** Built **claim by claim**: every row names the source it came
> from, and the numbered list at the bottom is what those names point at. The sources are
> **encyclopaedia-grade, not primary** — rough sources are fine at this stage
> ([README.md](README.md)), assertions made to a reader are not.

**What the app already has for Egypt:**

| | |
|---|---|
| Flag | ✅ `app/assets/flags/eg.png` |
| Country entry | ✅ listed in [`anthems.ts`](../app/src/content/anthems.ts) as `eg` |
| National anthem recording | ❌ none yet — `/countries` says so honestly |
| Language map (drives the language picker) | ❌ not mapped — and cannot be; see below |

---

## Languages

| Language | Status | Also spoken in SA? | Source |
|---|---|---|---|
| Modern Standard Arabic | **Official** | No | [1] |
| Egyptian Arabic | **National language** — what is actually spoken | No | [1] |

**Official-language instrument:** `[NEEDS SOURCE]` — source [1] names the official language but not
the constitutional article.

**Languages Ubuntu Heritage does not have:** both of them.

**A distinction this file should keep.** Source [1] separates *Modern Standard Arabic* (official) from
*Egyptian Arabic* (national, "in common usage"). They are not interchangeable, and collapsing them
would be the "official ≠ spoken" trap from [README.md](README.md). Egyptian Arabic is also the most
widely understood spoken Arabic across the Arab world, largely through Egyptian cinema and music —
`[NEEDS SOURCE]`, but worth chasing, because it makes Egypt a *broadcasting* culture in a way that
matters to this project.

**Same blocker as Burkina Faso** — the app speaks neither, and `country-languages.ts` has no shape for
that. See [`bf-burkina-faso.md`](bf-burkina-faso.md#languages).

---

## National anthem

- **Title (own language):** بلادي بلادي بلادي — *Bilady, Bilady, Bilady*
- **Title (English):** "My Homeland, My Homeland, My Homeland"
- **Adopted:** 1979
- **Words by:** Mohammad Younis al-Qadi
- **Music by:** Sayed Darwish
- **Recording we could use:** none sourced yet
- **Source:** [2]

> **Two things source [2] records that are worth carrying.** The composer, Sayed Darwish, is described
> as "a pioneer of Arabic music and a leader of the modern Egyptian renaissance" — this is not an
> anonymous state commission. And the **chorus lyrics come from a speech by Mustafa Kamil**, an early
> independence leader: the anthem is a political speech set to music. It served as an unofficial
> anthem for years and was made official only in **1979, after the peace accord with Israel**, chosen
> as the more peace-oriented option. An anthem adopted *because* of what it does not say.

---

## Milestones

| Year | Milestone | One grounded line | Source |
|---|---|---|---|
| c. 3150 BCE | Egypt unified | Under King Menes. | [1] |
| c. 2700–2200 BCE | The Old Kingdom | The pyramid-building era. | [1] |
| c. 1550–1070 BCE | The New Kingdom | | [1] |
| 525 BCE | Persian conquest | Under Cambyses II. | [1] |
| 332 BCE | Alexander the Great's conquest | | [1] |
| 641 CE | The Arab Muslim conquest | Led by Amr ibn al-As. | [1] |
| 1517 | Ottoman conquest | | [1] |
| 1798 | Napoleon's invasion | | [1] |
| 1914 | British protectorate | Formally declared independent of the Ottoman Empire, but placed under British protection. | [1] |
| 1922 (22 Feb) | Declaration of independence | From the United Kingdom. | [1] |
| 1952 (22–23 Jul) | The Free Officers revolution | | [1] |
| 1956 | The Suez Canal nationalised | Under Nasser. | [1] |

**Framing note — the trap specific to Egypt.** Egypt is the one African country the rest of the world
already thinks it knows, and it knows it as **pharaohs, and nothing after**. A trail that stops at
1070 BCE and resumes at Napoleon tells the story colonial museums told. The 641 CE conquest, the
Fatimid and Mamluk city in the Heritage list below, Sayed Darwish's renaissance and Mahfouz's Cairo
are the same country and the same continuity. If Egypt ever enters the app, **the modern half is the
part that has to be there**, not the pyramids.

---

## Peoples & cultures

- `[NEEDS SOURCE]` — source [1] states no ethnic composition at all. Not filled in from memory.
- **Coptic Christianity** is present in the heritage record — Abu Mena is an early Christian pilgrimage
  centre and Saint Catherine's is described as the oldest functioning Christian monastery [3] — but
  source [1] says nothing about the living Coptic community. That absence is a gap, not a finding.
- **Egyptian cinema and music** as continental cultural export: `[NEEDS SOURCE]`, and the most
  promising thread in this file for a project about voices.

---

## Literature & voices

| Writer | Work | Year | Language | Source |
|---|---|---|---|---|
| Naguib Mahfouz | *The Cairo Trilogy* — *Palace Walk*, *Palace of Desire*, *Sugar Street* | 1956–57 | Arabic | [4] |
| Taha Hussein (1889–1973) | *Shajarat al-bu's* — a family saga, the first of its kind in Egyptian literature | 1944 | Arabic | [4] |
| Tawfiq al-Hakim (1898–1987) | *The Sultan's Dilemma*, best known of more than seventy plays | `[NEEDS exact year]` | Arabic | [4] |

**Why this is the strongest literature section in the folder so far.** **Naguib Mahfouz won the Nobel
Prize in Literature in 1988 — the first Arabic-language writer to do so** [4]. Tawfiq al-Hakim is
described as the undisputed creator of a literature of the theatre in Arabic, second in importance
only to Mahfouz [4]. These are not "notable locals"; this is a national canon with a Nobel in it, and
unlike Algeria's, **it is written in the country's own language**.

**The connection worth making.** Mqhayi is Ubuntu Heritage's pillar for a writer who built a modern
literature *inside* an indigenous language rather than beside it. Al-Hakim did the same for Arabic
theatre. If the app ever reaches North Africa, that is the pairing — not "Egypt = pyramids".

---

## Heritage & sites

Seven UNESCO World Heritage Sites, all from source [3]:

| Site | Inscribed | Type | What it is |
|---|---|---|---|
| Memphis and its Necropolis | 1979 | Cultural | The pyramid fields from Giza to Dahshur |
| Ancient Thebes with its Necropolis | 1979 | Cultural | Capital in the Middle and New Kingdom periods |
| Nubian Monuments, Abu Simbel to Philae | 1979 | Cultural | Monuments relocated to save them from Nile flooding |
| Historic Cairo | 1979 | Cultural | Ensembles of Tulunid, Fatimid and Mamluk buildings |
| Abu Mena | 1979 | Cultural | Early Christian pilgrimage centre around the tomb of Menas |
| Saint Catherine Area | 2002 | Cultural | The oldest functioning Christian monastery, in Sinai |
| Wadi Al-Hitan (Whale Valley) | 2005 | **Natural** | The most important fossil site for the study of cetacean evolution |

**The Nubian Monuments carry a second story.** They are inscribed as monuments that were *moved* —
cut apart and reassembled above the waterline of the Aswan High Dam. What is not in source [3] is
what happened to the **Nubian people** displaced by the same reservoir. If this site is ever used in
the app, that omission is the thing to correct, not repeat. `[NEEDS SOURCE]`

---

## Open questions

- [ ] **The constitutional article** naming Arabic as official.
- [ ] **Ethnic and religious composition**, including the Coptic community — entirely absent from
      source [1].
- [ ] **The Nubian displacement** behind the Abu Simbel relocation. Named above as a gap on purpose.
- [ ] **A publication year for *The Sultan's Dilemma*.**
- [ ] **Egyptian cinema and music as continental export** — the strongest untouched thread here.
- [ ] **An anthem recording**, and whether source [2]'s audio is licensed for reuse.
- [ ] **Ancient Egyptian and Coptic as languages** — neither is in the Languages section because
      source [1] does not raise them. Coptic's liturgical survival is a real language story.

---

## Sources

1. Egypt — Wikipedia. `en.wikipedia.org/wiki/Egypt` — languages, milestones, independence.
2. Egypt — nationalanthems.info. `nationalanthems.info/eg.htm` — anthem title, adoption, lyricist,
   composer, the Mustafa Kamil speech and the 1979 adoption context.
3. List of World Heritage Sites in Egypt — Wikipedia.
   `en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_Egypt` — the seven sites, years and types.
4. Egyptian literature — surfaced via search across **NobelPrize.org** (Mahfouz), **Britannica**
   (Mahfouz), Wikipedia (*Cairo Trilogy*), AUC Press and JSTOR (al-Hakim). Stronger than the
   equivalent source in [`dz-algeria.md`](dz-algeria.md); the Nobel and Britannica citations are
   directly checkable.
