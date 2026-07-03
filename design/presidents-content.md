# The Presidents — content structure & grounded draft

> **Design-lab scaffold.** The five democratic-era Presidents of South Africa (1994–present).
> Same grounding rule as everywhere: truth only, cite or flag, and **handle hard chapters honestly —
> neither sanitised nor sensationalised** (grounding rule §6). Markers: **[VERIFY]** confirm exact
> figure · **[NEEDS SOURCE]** don't state until sourced · **[REVIEW: Setswana]** Emma checks the tn.
> Scope decision: democratic era only. Pre-1994 apartheid State Presidents/PMs could be added later
> as clearly-framed historical context — a sensitive editorial call for Emma.

## Data model

```ts
type President = {
  id: string; order: number;
  name: string; clanOrNickname?: string;   // e.g. "Madiba · Tata"
  term: { from: string; till: string };     // "1994" – "1999" | "present"
  born: { date: string; place: string };
  died?: { date: string; place: string };   // omit if living
  party: string;
  struggle: LocalizedText;                   // liberation / anti-apartheid role
  life: TimelineEvent[];                      // born → key events → death
  family: { relation: string; name: string; note?: string }[];
  know: LocalizedText[];                      // "what every South African should know"
  quote?: { text: string; source: string };
  sources: string[];
};
```

---

## 1 · Nelson Mandela  ·  *Madiba · Tata*
- **Term:** 1994–1999 (1st democratic president) · **Party:** ANC
- **Born:** 18 July 1918, Mvezo, Eastern Cape (Thembu royal house) · **Died:** 5 Dec 2013, Johannesburg (aged 95)
- **Struggle:** Joined the ANC (1944), co-founded its Youth League; co-founded Umkhonto we Sizwe; convicted at the **Rivonia Trial (1964)**, imprisoned **27 years** (much on Robben Island); released **11 Feb 1990**; shared the **1993 Nobel Peace Prize** with F.W. de Klerk.
- **Family:** Evelyn Mase (m.1944–58) · Winnie Madikizela-Mandela (m.1958–96) · Graça Machel (m.1998) · six children.
- **Know:** clan name **Madiba**, called **Tata**; chose reconciliation (the **TRC**); served a **single term** by choice.
- **Quote:** "It always seems impossible until it's done." (*Long Walk to Freedom*)
- **Sources:** *Long Walk to Freedom*; Nelson Mandela Foundation.

## 2 · Thabo Mbeki
- **Term:** 1999–2008 (resigned Sept 2008) · **Party:** ANC
- **Born:** 18 June 1942, Mbewuleni, Eastern Cape · **Living**
- **Struggle:** ANC in exile from the 1960s; a key figure in the negotiations that ended apartheid.
- **Family:** wife **Zanele Mbeki** (née Dlamini). Son Kwanda disappeared in the 1980s. [VERIFY details]
- **Know:** the **"I am an African"** speech (1996, adoption of the Constitution); championed the **African Renaissance** and NEPAD; oversaw strong economic growth. **Honestly:** his government's **HIV/AIDS denialism** and "quiet diplomacy" on Zimbabwe drew serious, lasting criticism.
- **Sources:** the Presidency archives; Mark Gevisser, *A Legacy of Liberation*.

## 3 · Kgalema Motlanthe
- **Term:** Sept 2008 – May 2009 (**caretaker** after Mbeki resigned, until the 2009 election) · **Party:** ANC
- **Born:** 19 July 1949, Boksburg · **Living**
- **Struggle:** trade unionist (**NUM** secretary-general); imprisoned on **Robben Island** (c.1977–1987) for ANC activity. [VERIFY dates]
- **Family:** [NEEDS SOURCE — confirm before stating]
- **Know:** a stabilising steward during a tense handover; respected as a unifier; later chaired the **High-Level Panel** reviewing post-1994 legislation.
- **Sources:** the Presidency; SA History Online.

## 4 · Jacob Zuma
- **Term:** 2009–2018 (resigned Feb 2018) · **Party:** ANC
- **Born:** 12 April 1942, Nkandla, KwaZulu-Natal · **Living**
- **Struggle:** joined MK; imprisoned on **Robben Island for 10 years** (1963–1973); ANC intelligence in exile.
- **Family:** a **polygamist** in Zulu tradition, with several wives and many children. [VERIFY specifics before naming]
- **Know (honestly):** a popular orator with deep struggle credentials, but a presidency **dominated by controversy** — the arms-deal and corruption charges, **Nkandla**, and **"state capture"** (later examined by the **Zondo Commission**). In 2021 he was jailed for contempt of court, triggering unrest. State the record factually, without editorialising.
- **Sources:** the Zondo Commission report; the Presidency; court records.

## 5 · Cyril Ramaphosa
- **Term:** 2018–present · **Party:** ANC
- **Born:** 17 November 1952, Soweto, Johannesburg · **Living**
- **Struggle:** founded the **National Union of Mineworkers (1982)**; **chief negotiator** for the ANC at CODESA and chaired the Constitutional Assembly that produced the **1996 Constitution**.
- **Family:** wife **Dr Tshepo Motsepe**. [VERIFY children]
- **Know:** later a prominent businessman; returned to lead the country on an anti-corruption platform. **Honestly:** his role as a **Lonmin** director around the **2012 Marikana** massacre remains a serious point of scrutiny.
- **Sources:** the Presidency; Anthony Butler, *Cyril Ramaphosa*.

---

---

## Before democracy — heads of state, 1910–1994

> **Honest framing (required).** These were leaders of the Union and the apartheid state. Include them
> because the history matters — but recorded factually, **neither erased nor celebrated**. Democratic
> presidents carry the gold accent; these carry a neutral grey. Every line below is standard public
> record; confirm exact dates before ship. **[VERIFY dates]** across the board.

| # | Name | Office · years | What to know (factual) |
|---|------|----------------|------------------------|
| 1 | **Louis Botha** | PM · 1910–1919 | First PM of the Union of South Africa; Boer general turned statesman. |
| 2 | **Jan Smuts** | PM · 1919–24 & 1939–48 | Global statesman (League of Nations, UN preamble) who upheld segregation at home. |
| 3 | **J.B.M. Hertzog** | PM · 1924–1939 | Afrikaner nationalism; segregation laws that stripped Black South Africans' voting rights. |
| 4 | **D.F. Malan** | PM · 1948–1954 | The National Party's 1948 win — apartheid formally becomes law. |
| 5 | **J.G. Strijdom** | PM · 1954–1958 | Entrenched white-minority rule; removed Coloured voters from the common roll. |
| 6 | **H.F. Verwoerd** | PM · 1958–1966 | The "architect of apartheid"; Bantu Education Act; assassinated in 1966. |
| 7 | **B.J. Vorster** | PM · 1966–1978 | Security-state repression; detention without trial; the Soweto-uprising era. |
| 8 | **P.W. Botha** | PM 1978–84 · State President 1984–1989 | "Die Groot Krokodil"; states of emergency; reform that entrenched control. |
| 9 | **F.W. de Klerk** | State President · 1989–1994 | Unbanned the ANC, freed Mandela, negotiated apartheid's end; shared the 1993 Nobel Peace Prize. |

*(The ceremonial State Presidents of 1961–1984 — Swart, Fouché, Diederichs, Viljoen — were largely
non-executive; include as a footnote if desired.)*

## Cross-links (cohesion)
- **Mandela / Ramaphosa → Soweto** (Cultural Atlas · Provinces) · **all → Community Archive**
  ("record your memory of Madiba / where you were in 1994").
- Every president page → **"record your family's memory"** (Community Archive).

## Open items before ship
1. Confirm **[VERIFY]** dates and family details; fill or omit **[NEEDS SOURCE]**.
2. Keep controversy language **factual and sourced** (Zondo report, court records) — this is where grounding matters most.
3. Setswana translations — **[REVIEW: Setswana]** (Emma).
4. Portraits: use only **properly-licensed** images; the mockup uses dignified monograms as a stand-in.
5. Decide whether to add pre-1994 heads of state as framed historical context.
