
Black box vd grey box testing

 Dangerously skip permissions

  

Docker container med Claude i

  

Ställ frågor om oklarheter i projektets spec, be den svara själv hur det kan lösas

  

Acceptance criteria given when done

  

Ask three questions about you task before starting

Question Assumption

Uppdatera specen

  
  

Build

  

Verify

Skapa cli verktyg för att Crud databas, seed it etc

  
  

Smoke test

Den beskriver alla manuella steg som vi skall göra för att testa

  

Security

Vad finns det för säkerhetshål?

Finns det någon nackdel med att lösa dessa?

Fördelar med att lösa detta

  

Fixa dessa sakerna och lägg in tid så det inte dyker upp igen

  

Subagenter

Alla subagentena har en egen Claude session

Tydliga instruktioner och avgränsningar så de inte skriver i samma del eller för samma uppgifter

  

Forked agents

Ärver egenskaperna från huvud agenten

Cache optimering

Svårare att få dom specialiserade för alla får samma context

Bra om alla skall göra liknande saker, typ research men på olika ställen

  

Team agents

Gemensam to-do list

Context fylls upp för de pratar med varandra

  
  
  

Agent flöden

  
  

Få tillgång till fler modeller, bygga en egen agent




Föreläsning 2
Mechanical sympathy

Agenten sitter mellan lön och koden

  

Coding agenten Explorer

  
  

Hur pratar den? Försöka undvika att bränna tokens

  

Claude Kode hr verktyg som modellen sen kan använda via agenten

Den säger att den har dessa vertyk, för tt använda dom skriv detta

  

Den skickar alltid med systemprompten om hur agenten funkar

Sen skickar den tools, först en toolsearch där den kan söka efter vilka tools den kan använda

  

Modellen har ingen state, den minns inte vad ni pratade om innan

  
  

Mcp

  

Api är svåra att använda för en api. Att upptäcka vad som är möjligt, dokumentationer etc

  

Mcp server eller en lokal process

Exponeras som tools för modellen

  
  

Git mcp

Skapa en mcp tjänst mot ett specifikt repo

  
  
  

System prompten

Tools

Context / Fråga

  

Skickar med hela historiken varje gång

  

Hooks

När vissa interna saker körs. When tool is used, before tool is used ercäätc

  
  
  

Bygg en egen

En agent är bara en loop

Lägg till context så den kommer ihåg din input

  

Tool

While agent wants to use tool, send this tool

Vertykgsreqywst, switch file som skickar olika

  

Skills

Du kan tvinga den genom att skriva /skulle

Beskriv din skill väl

  

En beskrivning för hur agenten skall utföra vissa saker

Den löser bara igenom beskrivningen och skickar med för att se vilka skills som kan vara användbara

Det som är nedan kan alltså vara längre och [t.ex](http://t.ex/). referera till andra filer worktrees

  

Språk struktur spelar ingen roll för llm 

  

Fine för sin att säga vilka kommandon den får köra

  

Rules (cursor specific)

När du skriver testerna. Följ denna namngivningen etc

Kan välja att den är applied to specific file, alltid, apply manually, apply intelligently

  
  

Blir prompten för stor och den komprimerar det så tappar den info och kan börja göra fel

  

Skapa dokumentation

På vilka sätt kan du förklara ett projekt som detta?

Ge dem förslag

  

Skapa en FAQ under varje rubrik

2 meningar i varje

  

Skriv dina egna frågor som llm får svara på

Skapa diagram, för databasen samt ett flödesschema

  

Skapa en skill hur den skall skriva dokumentation

Skapa en skill för att skapa eller uppdatera dokumentation

Skall ha samma format som de andra filerna


Föreläsning 3 (galna AI gubbar)
Early adopterers, vill ha mer friktion

  

Majoriteten

Friktionsfritt, behöver en kritisk massa som redan använder ai

  

Skapa ett sug, tryck inte på dem det nya sättet

  

Mcp

Model context protocol

Koppla språk modeller med egna lösningar

  
  

Skapa 20 nya paket för Skoda Octavia

Från 1,5 timme till 5 minuter

  

Tillgång till kod, databas, loggar, 

Låta Ai felsöka och söka i loggar

  

Bygga egna agenter

Som övervakar 

  

Wille, kollar alla kodrrpon och ser vad varje team jobbar med per dag

Minskar standups, syncmöten

  

Agneta

Container platform. Behöver något uppgraderas? Skapar en uppgift till Albert som kollar , läser release notes, kollar om uppdateringen är säker

Bosse uppgraderar om Albert säger ok

  

Gör det i testmiljön först, kör några dar innan det går live

Uppdaterar ofta, blir små ändringar

  
  

Engineering toolbox

Verktyg till agenterna

  

Titta på krav, dokumentera, etc. Bara finnas i promten

  

Be om nya features, skapar en issue i GitHub och en agent tar vid där och skickar en PR


Föreläsning 4
Voidleap

  

Application

  
  
  

Harness

(Folk som pratar är skills etc = scaffolding)

Runtime mellan min datorn och servern

  
  

LLM

  
  

Scaffolding

Subagent, minska antalet tools så den blir nishad.

Använd rätt model, open ai på subagenter
