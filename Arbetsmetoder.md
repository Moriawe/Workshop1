
Jag har två olika workflows jag kör. Ett på jobbet och ett hemma

På jobbet får jag info ifrån flera håll. Kunden, Teamlead, Backend, Design, Firmware developer och min andra android utvecklar teammate. Jag är begränsad av vad jag kan låta min AI se och göra eftersom jag inte äger koden eller projektet. Det är en säkerhetsaspekt och en vad får jag dela med AIn aspekt. 


Jobbets workflow

Workplan
Jag har en lista med uppgifter med olika prio från Teamlead. Jag sköter själv github issues för att få en historik och loggning av mitt arbete men mitt team har inte en board med olika prioritet som gås igenom varje dag utan det är upp till mig. 

Jag skall skicka events till en cloudlösning så vi kan föra statistik. 
Då plockar jag in allt som det innefattar, läsa på dokumentationen, vilka jag behöver prata med (firmware och analytics, vad behöver kunden logga). Jag kollar om jag redan loggat några issues angående detta och sedan ber jag min AI planera arbetet. Den lägger upp en workplan med högst 15 uppgifter, om det blir fler så delas arbetet upp i 2 delar. 

En workplan består av 5 filer
Task - en tabell med alla uppgifter, om de är klara och vilket commit som gjorde dom klara. 
Task details - en fil med alla detaljer, länkad från den första filen. Därför att det blev för plottrigt att ha all info i listan med uppgifter och i mina första försök kunde jag ha upp till 30 uppgifter i en workplan. 
Findings är saker som vi hittar under arbetets gång. Kan vara buggar, något funkade inte som vi hade antagit etc. 
Decisions är en fil med beslut vi tagit om olika saker och som påverkar projektet och kanske något jag behöver ta vidare till andra medlemmar av teamet
Questions - om jag behöver kolla av med någon annan i teamet så hamnar de här så det loggas om det är gjort eller inte

En del av sakerna AIn hittar är småsaker som är helt onödiga. Det kan vara frågor jag redan vet svaret på så jag går då och då över dokumenten och ser om jag kan stryka saker eller svara på dom själv. Då underlättar det att de inte ligger i en enorm memory fil eller en scratchpad någonstans som jag inte hittar. 
För ytterligare överblick använder jag Obsidian som kan läsa md filer på ett snyggt sätt. Den kan även läsa SVGs och AIn kan göra himla snygga SVG överblickar för projekt (Tips)


Workplan close

När jag stänger en workplan så ser jag till att jag kollar mot koden så alla tasks verkligen har gått igenom. Jag vidarerapporterar alla findings och decisions så de antingen uppdaterar en skill eller rule eller hamnar i dokumentationen om det behövs. 

Först
1. Review mot develop. Kollar igenom architecture, correctness, tets, conventions, och security
2. Kollar så alla tasks är stängda, vidare befodrar ev. obesvrade frågor, findings och decisions till sina respektive hem i projektet
3. Lägger workplanen i RETIRED foldern. Jag kan fortfarande gå tillbaka och titta på vad som gjordes i en specifik workplan utan att behöva leta igenom 28 chatsessions


