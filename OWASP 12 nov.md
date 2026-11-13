
Edvin Norling

160 PRs / day, 
Renovate and dependabot PRs 

Started with Supply chain attacks
Look for breaking changes and supply chain attacks

32000 merged PRs, 82 % approvied by bots
0.44 $ / review

Approve 58%


Deterministic gates
GIve it harness
Bot Author, check that it comes from renovate or dependabot, do we trust the author?
File path, what are we updating? go mods, py, yml
Diff pattern
Agent review
Merge

CVE scanning in the CI

Tools 

Untrusted input
Yes by design

Senstitive access
Kept narrow

Change state
Never the model

Every verdict is a structured table
Package, ecosystem source repo, verification
Reasons table action

Evals (tdd)
Update prompt and tools, make the ai do its job
Make it show which tools it used
the ai can't lie and say it used it

Eval libraries

Fixture, live model, replayed tools, go scorer
Replay over different agents, review results


Examples
Must not approve
Should approve
KNown blind spots

A wrong approve fails the suite. Run several times

Prompt injections in the PR body won one run in three
prompt rules were not enought so a second model now veteos approved prs, 
it checks if someone tries to temper with it. Injector detector
Use Jev?


Alloy Helm chart

built a tool instead
yml file that checks where it was downloaded from etc

tools that reads changelogs on github for the dependencies



Cyber offence at AI speed

Dennis Durrefjord

How much can e let AI do? 
We have to rely on the output
Risk

Cyber offence
Probability of AI mistake and impact of AI mistake
PatchHog

New commit, is it a security fix? yes then create expolit, itterate until good
TOok 4.6 min to find an exploit for it
17 days to patch for the company

If someone release a patch we wait a few more days to be sure since shailud, so + 2 days or soo
Patches takes 7 days 


Can defense keep up?

Humans are bottlenecks
remove or reduce the attack vector, security by design
otherwise we have to try to match the speed an automate as much as possible

We can find vulnerabilities and find explotabilities just like the attackers

Patching
System needs to still work
Patch the hole

Quarantining production enviroment
Changing product security protocols
patching vulnerabilities

What is the risk of inaction?
What actions could solve the problem?
What is the probability of a mistake using AI, how can we lower it?
Same with impact
Can we find a subset of the scope that looks more promising


Pentest with a AI will get guardrailed?
used Kimi
Claude didnt react at all to making exploits
Social engineer the AI

Claude is more allowing if you have it in a local enviroment


The future of Open source
Run their own patch hog and find their own vulnerabilities
Source code is more important to protect since having it makes it easier to find attack angles
AI can also reverse engineer

To defend I need to use the AI but the AI is locked down to NOT do that

Difference between smaller companies and bigger companies

We need people that have an understanding of what and how to create, the grunt work becomes automized. 

People with the knowledge 
companies already offloading knoweldge into AI
smaller companies where only one person sits on the info

THe value of knowing the domain is more valuable now, how to put everything together

How can a patch go out faster? 
THen we also need to update our dependecies all the time
If we build something tht just updates direclty then we are vulnerable for supply chain attacks
We need less dependencies, trusting others is not a option

github actions, safe?


We dont need the small libraries anymore



