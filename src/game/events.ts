import type { Choice, GameEvent, Deltas } from './types'

const c = (label: string, description: string, deltas: Deltas, title: string, text: string, delayed?: Choice['delayed']): Choice => ({ label, description, deltas, outcome: { title, text }, ...(delayed ? { delayed } : {}) })
const e = (id: string, title: string, body: string, tag: GameEvent['tag'], choices: [Choice, Choice, Choice]): GameEvent => ({ id, title, body, tag, choices })

export const EVENTS: GameEvent[] = [
 e('banana-crisis','The Banana Crisis','Your accountant spent ₦500,000 on motivational bananas. A goat investor wants an explanation.','finance',[
  c('Call them a strategic wellness asset','Put a banana in every meeting folder.',{cash:-50000,happiness:8,confidence:5,chaos:4},'BRILLIANT FRUIT STRATEGY','The board applauds, then quietly eats the evidence.'),
  c('Fire the accountant','He is a potato anyway.',{cash:-100000,happiness:-8,confidence:3,chaos:8,reputation:-3},'LEGAL HAS QUESTIONS','The accountant leaves with the only working calculator.'),
  c('Eat the financial report','Auditors cannot audit what is digesting.',{cash:120000,happiness:3,confidence:-10,chaos:12,reputation:-5},'THE REPORT IS DELICIOUS','You discover it was mostly banana receipts. The auditors discover you.')
 ]),
 e('potato-union','Mash Workers United','The potato employees have unionised beneath the photocopier. Their demands are surprisingly specific.','people',[
  c('Negotiate potato holidays','Offer one afternoon off for boiling.',{cash:-90000,happiness:14,confidence:2,chaos:-5},'A HISTORIC ACCORD','The union ratifies the treaty with a ceremonial mash.'),
  c('Challenge them to a dance-off','Sir Fries says rhythm is a management tool.',{cash:-30000,happiness:5,confidence:-3,chaos:15},'THE POTATO SHUFFLE','You lose to a root vegetable, but morale enjoys the spectacle.'),
  c('Replace them with motivational posters','Posters never ask for dental coverage.',{cash:40000,happiness:-18,confidence:-7,chaos:10,reputation:-4},'THE WALLS ARE WORKING','The posters unionise by lunchtime.')
 ]),
 e('square-eggs','The Square Egg Offensive','A competitor launched square eggs. They stack beautifully and look smug.','market',[
  c('Launch triangular eggs','Nobody can stack those either.',{cash:-180000,eggs:110,happiness:3,confidence:7,chaos:9},'GEOMETRY WINS','The triangles roll into a premium niche market.'),
  c('Sue geometry','Your lawyers insist angles are a protected brand.',{cash:-120000,confidence:-8,chaos:12,reputation:-2},'LEGAL HAS REQUESTED A RULER','The judge orders everyone to use round arguments.'),
  c('Buy every square egg','Corner the cornered market.',{cash:-450000,eggs:180,confidence:12,happiness:-6},'A VERY POINTY ACQUISITION','The warehouse is now impossible to clean.')
 ]),
 e('eggcoin','EggCoin Collapse','The accountant invested payroll in a cryptocurrency backed by one optimistic hen.','finance',[
  c('HODL the yolk','Believe in the shell.',{cash:-150000,confidence:8,chaos:10},'TO THE MOON, THEN THE BARN','EggCoin briefly rises because a duck tweets.'),
  c('Sell immediately','Convert dreams into slightly less money.',{cash:-65000,confidence:2,chaos:-4},'A CONTROLLED SCRAMBLE','You exit before the coin becomes a recipe.'),
  c('Pay salaries in EggCoin','Employees love innovation, allegedly.',{cash:260000,happiness:-22,confidence:-12,chaos:18,reputation:-8},'THE PAYROLL MUTINY','Everyone receives 0.0003 eggs and a stern apology.')
 ]),
 e('goat-cfo','The Goat CFO','A goat has become CFO after eating the previous candidate’s résumé.','investor',[
  c('Trust the goat','It has excellent instincts and no spreadsheet.',{cash:180000,confidence:9,chaos:10},'A GOAT WITH A GUT FEELING','The goat finds a hidden tax rebate in a lunchbox.'),
  c('Give it a calculator','Numbers may distract from chewing.',{cash:-60000,happiness:4,confidence:4,chaos:3},'ACCOUNTING BY NIBBLE','It submits a balanced report and one calculator.'),
  c('Promote it to CEO','Finally, a leader who can eat the paperwork.',{cash:90000,happiness:-8,confidence:-15,chaos:20,reputation:-6},'THE BOARD BLAMES YOU','The goat immediately schedules a cheese merger.')
 ]),
 e('potato-pay','Potato Payroll','Your employees demand payment in potatoes, citing “liquidity with starch.”','people',[
  c('Pay in premium potatoes','Quality spuds, quality workers.',{cash:-110000,happiness:16,eggs:45,chaos:-3},'STARCH-BASED COMPENSATION','Productivity rises; the break room becomes a market.'),
  c('Issue potato futures','Promise potatoes next quarter.',{cash:80000,happiness:-7,confidence:6,chaos:8},'A FUTURE FULL OF POTATOES','The futures mature into a very angry lunch.'),
  c('Pay in inspirational clucks','Your speech contains twelve clucks.',{cash:30000,happiness:-15,confidence:-8,chaos:13},'THE CLUCK STRIKE','The workforce responds with a synchronized silence.')
 ]),
 e('literal-motivator','The Motivational Chicken','Your guest speaker is a literal chicken who only says “you can do it” while pecking furniture.','people',[
  c('Book a stadium','Scale is the solution to everything.',{cash:-160000,happiness:18,confidence:5,chaos:9},'A PECK-TACULAR SEMINAR','The crowd leaves inspired and slightly perforated.'),
  c('Make it head of HR','It understands chickens deeply.',{cash:70000,happiness:6,confidence:-4,chaos:11},'HR HAS GONE FERROUS','The new policy is mostly seeds and eye contact.'),
  c('Cancel the talk','Furniture insurance wins.',{cash:40000,happiness:-5,confidence:2,chaos:-6},'MOTIVATION REFUNDED','The chicken leaves a one-star review with its beak.')
 ]),
 e('duck-review','The Duck Review','A duck gave the company one star and wrote, “Quack.” Investors demand a response.','reputation',[
  c('Offer a diplomatic pond tour','Hospitality can fix anything.',{cash:-70000,reputation:12,confidence:4,chaos:4},'QUACK DIPLOMACY','The duck upgrades you to two stars after seeing the snacks.'),
  c('Reply publicly in all caps','Your community manager is a goose.',{cash:20000,reputation:-8,confidence:-4,chaos:12},'THE COMMENT SECTION WADDLES','The feud trends for three days and sells no eggs.'),
  c('Blame the duck’s feet','They are clearly biased.',{cash:60000,reputation:-16,confidence:-5,happiness:-4,chaos:15},'A FOOTNOTE OF SHAME','The duck opens a competing review site.')
 ]),
 e('printer-resignations','The Resignation Printer','The office printer prints resignation letters despite having no employment contract.','chaos',[
  c('Promote the printer','At least it understands turnover.',{cash:-80000,happiness:9,confidence:2,chaos:8},'INK-REDIBLE LEADERSHIP','The printer prints its own acceptance letter.'),
  c('Unplug it dramatically','Pull the cable like a defusing expert.',{cash:-20000,happiness:3,confidence:1,chaos:-8},'PAPER JAM JUSTICE','Silence returns, along with one ominous fax.'),
  c('Print counter-resignations','Fight paperwork with paperwork.',{cash:50000,happiness:-11,confidence:-6,chaos:18},'ADMINISTRATIVE WAR','The printer wins on toner reserves.')
 ]),
 e('gravity-lawsuit','Gravity on Trial','Legal has sued gravity for repeatedly dropping morale and occasionally eggs.','legal',[
  c('Fund the lawsuit','Justice must be weightless.',{cash:-210000,confidence:7,chaos:14,reputation:4},'THE CASE HAS LIFT','The judge schedules a hearing in mid-air.'),
  c('Settle with gravity','Offer a respectful downward nod.',{cash:-30000,chaos:-6,reputation:3},'A GROUNDED SETTLEMENT','Gravity agrees not to drop eggs during presentations.'),
  c('Sue the floor instead','It has been complicit for years.',{cash:90000,confidence:-9,chaos:19,reputation:-6},'LEGAL HAS LOST THE PLOT','The floor declines comment and remains underfoot.')
 ]),
 e('four-hundred-chickens','Four Hundred Chickens, One Desk','HR hired 400 chickens for one desk. They are all claiming the corner seat.','people',[
  c('Open a second desk','Modest expansion solves everything.',{cash:-220000,happiness:15,eggs:130,confidence:4},'SEATING IS PRODUCTIVITY','The chickens form a queue and discover teamwork.'),
  c('Make it a chicken-share','Each bird gets 0.25 desk.',{cash:80000,happiness:4,chaos:13,confidence:-2},'FRACTIONAL FURNITURE','The desk appreciates in value, but nobody can sit.'),
  c('Declare the desk a town','Give everyone municipal titles.',{cash:-40000,happiness:7,reputation:5,chaos:20},'WELCOME TO DESK CITY','The mayor is a hen named Brenda. Taxes begin immediately.')
 ]),
 e('typo-fame','The Annual Report Typo','Your report says “profit” is “prophet.” The internet thinks you predict the future.','reputation',[
  c('Lean into prophecy','Sell forecasts with dramatic feathers.',{cash:240000,confidence:12,reputation:14,chaos:8},'THE PROPHET MARGIN','Investors pay to hear next quarter’s weather.'),
  c('Correct the typo','Honesty is usually cheaper.',{cash:-30000,confidence:5,reputation:4,chaos:-5},'SPELLCHECK RESTORED','The internet moves on to a more embarrassing company.'),
  c('Add more typos','Build a mystery brand.',{cash:110000,confidence:-6,reputation:7,chaos:16},'THE SECRET LANGUAGE OF FINANCE','Analysts call it bold; nobody can reproduce the numbers.')
 ]),
 e('road-powerpoint','Road-Crossing PowerPoint','The board wants 80 slides explaining why chickens cross roads.','investor',[
  c('Present with interpretive dance','The projector becomes a spotlight.',{cash:-90000,happiness:12,confidence:10,chaos:12},'THE ROADSHOW','The board gives a standing ovation and a parking fine.'),
  c('Use one slide','Minimalism terrifies executives.',{cash:40000,confidence:-5,chaos:-3,reputation:2},'A SINGLE, HAUNTING ARROW','Everyone understands less, but quickly.'),
  c('Cross the road live','Research must be practical.',{cash:-70000,happiness:-9,confidence:3,chaos:18},'FIELDWORK WITH FEATHERS','You arrive safely, but the meeting is now in another county.')
 ]),
 e('treadmill-wifi','The Treadmill Wi-Fi','The office internet is powered by an intern on a treadmill. The intern has requested knees.','productivity',[
  c('Buy a faster treadmill','Bandwidth is a lifestyle.',{cash:-140000,eggs:100,happiness:8,chaos:5},'FULL-SPEED CONNECTIVITY','Downloads fly; the intern becomes a blur.'),
  c('Give the intern a bicycle','Innovation with pedals.',{cash:-45000,happiness:13,confidence:3},'WHEELY GOOD MANAGEMENT','The network gains range and the intern gains calf muscles.'),
  c('Tell everyone to clap','Applause is renewable energy.',{cash:30000,happiness:-13,confidence:-3,chaos:14},'BUFFERING WITH ENTHUSIASM','The Wi-Fi works for exactly one inspirational GIF.')
 ]),
 e('chair-raise','The CEO Chair Wants a Raise','Your chair has filed a formal complaint about lumbar neglect.','chaos',[
  c('Grant a salary increase','Respect the furniture hierarchy.',{cash:-50000,happiness:5,confidence:3,chaos:7},'A SEAT AT THE TABLE','The chair swivels with renewed purpose.'),
  c('Offer ergonomic training','Teach the chair to stand up for itself.',{cash:-90000,happiness:8,chaos:4},'SITTING PRETTY','The chair earns a certificate and stops squeaking.'),
  c('Replace it with a beanbag','Democratise executive comfort.',{cash:-20000,happiness:10,confidence:-8,chaos:11},'THE BOARD HAS NO SPINE','Everyone relaxes; nobody can get back up.')
 ]),
 e('cluck-fine','The Excessive Clucking Fine','The regulator says your meetings exceed the legal cluck-per-minute limit.','legal',[
  c('Hire a silence consultant','She communicates via eyebrow.',{cash:-100000,confidence:8,chaos:-6},'QUIETLY EXCELLENT','The next meeting is efficient and deeply unsettling.'),
  c('Appeal with a song','Your lawyer has a surprisingly good voice.',{cash:-70000,reputation:8,chaos:15,confidence:4},'THE CLUCKING MUSICAL','The regulator hums along and halves the fine.'),
  c('Pay in eggs','Administrative eggs are still eggs.',{cash:-90000,eggs:-80,confidence:-2,reputation:-4},'A HARD-BOILED PENALTY','The regulator accepts, then asks for a dozen more.')
 ]),
 e('jollof-report','The Jollof Quarterly','The investor report contains a recipe for jollof rice instead of the financials.','investor',[
  c('Claim it is edible analytics','Invite everyone for a tasting.',{cash:-80000,happiness:10,reputation:10,confidence:5},'SPICY DUE DILIGENCE','Investors forget the numbers while requesting seconds.'),
  c('Send the real report','Admit the cook took over.',{cash:30000,confidence:6,chaos:-4},'THE NUMBERS ARE AL DENTE','The board appreciates the correction and the leftovers.'),
  c('Publish the recipe','At least something will go viral.',{cash:130000,reputation:12,confidence:-7,chaos:9},'A TASTY IPO','Your brand becomes famous; your valuation becomes seasoning.')
 ]),
 e('mystery-egg','The Mystery Egg CEO','An unusually confident egg has been appointed acting CEO by nobody.','rare',[
  c('Share the throne','Two CEOs, one shell-based strategy.',{cash:160000,happiness:9,confidence:8,chaos:16},'CO-EXECUTIVE OMELETTE','The egg signs a merger while you are blinking.'),
  c('Interview the egg','Ask the hard questions: can it roll?',{cash:40000,confidence:5,chaos:5,reputation:3},'A SOLID CANDIDATE','It answers every question with dignified silence.'),
  c('Put it in the fridge','Some leaders need cooling off.',{cash:-30000,happiness:-5,confidence:-11,chaos:10},'A COLD EXECUTIVE DECISION','The egg launches a frozen competitor.')
 ]),
 e('power-outage','The Presentation Blackout','The power dies as investors ask what “premium air” actually is.','finance',[
  c('Sell the darkness','Rebrand it as artisanal night.',{cash:170000,confidence:8,reputation:5,chaos:12},'DARKNESS AS A SERVICE','Investors pay for a jar of nothing and call it immersive.'),
  c('Use candles','A classic presentation needs wax.',{cash:-40000,happiness:6,confidence:3,chaos:5},'A BRIGHT IDEA','The deck is readable; one slide catches fire emotionally.'),
  c('Blame the grid','Point at a map and look serious.',{cash:30000,confidence:-6,reputation:-3,chaos:7},'THE GRID IS NOT AVAILABLE','The grid declines to respond.')
 ]),
 e('mysterious-shareholder','The Anonymous Shareholder','A chicken in sunglasses owns 4% of the company and requests a helicopter.','investor',[
  c('Give the helicopter','Shareholder relations take flight.',{cash:-260000,confidence:15,chaos:9},'BOARDING NOW','The chicken flies away with your best stapler.'),
  c('Offer a bicycle','Sustainable luxury is still luxury.',{cash:-30000,confidence:5,reputation:4,chaos:3},'PEDAL POWER POLITICS','The shareholder accepts and starts a wellness podcast.'),
  c('Unmask the chicken','It is your former intern.',{cash:80000,confidence:-10,happiness:-4,chaos:14},'THE MASK COMES OFF','The intern votes against every proposal out of principle.')
 ]),
 e('yesterday-meeting','Meeting with Yesterday','Your assistant scheduled a meeting with yesterday. Yesterday has not accepted the invite.','chaos',[
  c('Attend anyway','Punctuality matters across timelines.',{cash:-20000,confidence:4,chaos:13,reputation:2},'A TIMELY DISCUSSION','Yesterday sends minutes from tomorrow.'),
  c('Reschedule for tomorrow','The calendar is now philosophical.',{cash:50000,happiness:4,chaos:8},'FUTURE PERFECT','Everyone agrees to meet after the crisis already happened.'),
  c('Fire the calendar','It knew too much.',{cash:-60000,happiness:-6,confidence:-4,chaos:-5},'TIME OFF FOR MISCONDUCT','The clock files an appeal.')
 ]),
 e('chair-egg','Egg in the Chair','An egg has appeared in your executive chair. It is warm, smug, and possibly your successor.','rare',[
  c('Name it interim CEO','Leadership should be incubated.',{cash:120000,confidence:10,chaos:18,happiness:5},'THE CHAIRMAN IS A CHICK','The egg demands a golden tie and gets one.'),
  c('Auction the discovery','Turn mystery into liquidity.',{cash:210000,reputation:6,confidence:-3,chaos:7},'A NEST EGG','A collector buys it and asks if you have another chair.'),
  c('Make an omelette','Decisive, nutritious, terrible PR.',{cash:50000,happiness:-14,reputation:-15,chaos:20},'THE BOARD IS BOILING','The company cafeteria names a dish after your downfall.')
 ]),
 e('goat-letter','The Goat Love Letter','Your goat investor accidentally sends a love letter instead of a term sheet.','investor',[
  c('Reply professionally','“Dear goat, thank you for your passion.”',{cash:130000,confidence:12,reputation:5,chaos:6},'A HEALTHY RELATIONSHIP','The goat signs the investment and a tasteful card.'),
  c('Read it at the board meeting','Transparency is romance-proof.',{cash:40000,happiness:7,confidence:-6,chaos:16},'AN INTIMATE DISCLOSURE','The board learns too much about alfalfa.'),
  c('Write back in bleats','Meet the investor halfway.',{cash:-20000,confidence:4,chaos:10,reputation:3},'BÈÈÈST PRACTICES','The goat calls it the most moving memo this quarter.')
 ]),
 e('confusing-award','Most Confusing Corporation','You win an award for corporate structure. Nobody knows who nominated you.','reputation',[
  c('Accept with dignity','Wear the trophy as a hat.',{cash:180000,reputation:13,confidence:9,chaos:8},'CONFUSION IS A MOAT','Analysts decide complexity is your competitive advantage.'),
  c('Return the trophy','Clarity begins with honesty.',{cash:-10000,reputation:8,happiness:3,chaos:-4},'A PRINCIPLED RETURN','The organisers award it back to you by courier.'),
  c('Sell naming rights','Confusion is monetisable.',{cash:260000,reputation:-5,confidence:-4,chaos:14},'THE SPONSORSHIP MAZE','Your company becomes “Eggzecutive Confusing Industries.”')
 ]),
 e('egg-shortage','The Egg Shortage','A spreadsheet error says you have sold 900 eggs that do not exist.','market',[
  c('Lay overtime','The hens accept dramatic bonuses.',{cash:-180000,eggs:260,happiness:-8,confidence:6},'SUPPLY FROM DETERMINATION','The orders ship, but everyone needs a nap.'),
  c('Sell the concept of eggs','Customers receive a tasteful brochure.',{cash:120000,confidence:-12,reputation:-10,chaos:15},'INTANGIBLE PROTEIN','The brochure is surprisingly glossy.'),
  c('Buy from a rival','Competitors enjoy your panic.',{cash:-300000,eggs:250,confidence:4,reputation:-2},'EGG DIPLOMACY','You pay extra for eggs with a rival’s logo.')
 ]),
 e('air-jar-leak','Premium Air Recall','Every jar of premium air contains the same suspicious sneeze.','legal',[
  c('Call it a signature scent','Luxury requires a nose.',{cash:150000,reputation:9,confidence:5,chaos:10},'THE SNEEZE IS A FEATURE','Collectors request the limited-edition cough.'),
  c('Recall everything','Safety is good for breathing.',{cash:-240000,confidence:8,reputation:6,chaos:-3},'A BREATH OF ACCOUNTABILITY','The replacement air is carefully tasteless.'),
  c('Blame the jars','Glass has always looked guilty.',{cash:-30000,confidence:-9,reputation:-8,chaos:12},'CONTAINER LIABILITY','The jars retain counsel.')
 ]),
 e('banana-memo','Banana Memo Leak','A private memo calls the board “fancy pigeons.” It is now on every desk.','reputation',[
  c('Own the phrase','Turn insult into a campaign.',{cash:140000,reputation:10,confidence:6,chaos:9},'FANCY PIGEON POWER','The board buys branded feathers.'),
  c('Blame autocorrect','Autocorrect has no lawyer.',{cash:-20000,confidence:-3,reputation:-4,chaos:4},'THE KEYBOARD IS FIRED','The memo is reissued with even worse adjectives.'),
  c('Write a worse memo','Dilution is a strategy.',{cash:60000,happiness:5,reputation:-12,confidence:-7,chaos:16},'THE ORIGINAL LOOKS POLITE','The new memo becomes mandatory reading.')
 ]),
 e('potato-protest','The Potato Sit-In','Potatoes have occupied the lobby and are chanting “Mash the patriarchy.”','people',[
  c('Serve gravy','Peace talks should be delicious.',{cash:-80000,happiness:18,chaos:-4,reputation:4},'A SAUCY PEACE','The protest becomes a communal lunch.'),
  c('Install a suggestion box','Democracy, but smaller.',{cash:-10000,happiness:8,confidence:3,chaos:2},'FEEDBACK WITH STARCH','The box receives 800 identical requests for chairs.'),
  c('Call security chickens','Escalate with feathers.',{cash:-40000,happiness:-20,confidence:-5,chaos:17,reputation:-6},'THE LOBBY BATTLE','Security slips on a potato and negotiates immediately.')
 ]),
 e('market-moon','The Moon Market','A memo predicts egg demand on the moon. The board wants a launch by Friday.','market',[
  c('Build a lunar coop','Shoot for the stars, literally.',{cash:-420000,confidence:16,eggs:180,chaos:17},'ONE SMALL PECK','The rocket reaches the roof and sells out of souvenirs.'),
  c('Sell moon-shaped cartons','Keep feet on Earth, branding in orbit.',{cash:150000,reputation:8,confidence:4,chaos:8},'A GRAVITATIONAL BRAND','Customers buy them for cereal and hats.'),
  c('Publish a moon denial','Science is a positioning statement.',{cash:30000,confidence:-8,reputation:-4,chaos:12},'THE MOON RESPONDS','Lunar demand remains firmly theoretical.')
 ]),
 e('audit-ghost','The Audit Ghost','A ghost auditor appears at midnight and asks where the missing receipts went.','rare',[
  c('Offer it a desk','Even ghosts need stationery.',{cash:-50000,confidence:12,chaos:7,reputation:4},'TRANSPARENT ACCOUNTING','The ghost finds three receipts inside your shadow.'),
  c('Haunt it back','Your chicken scream is formidable.',{cash:70000,confidence:-10,chaos:18},'PARANORMAL PAPERWORK','The ghost resigns in ectoplasm.'),
  c('Confess everything','Honesty is a strong exorcism.',{cash:-180000,confidence:8,reputation:11,chaos:-6},'THE BOOKS ARE CLEAN(ISH)','The ghost leaves a five-star spectral review.')
 ]),
 e('egg-drone','The Egg Delivery Drone','A drone has mistaken the CEO for its charging nest and keeps delivering eggs to your head.','productivity',[
  c('Scale head delivery','Personal logistics are the future.',{cash:-100000,eggs:200,happiness:7,chaos:11},'A HARD LANDING','Customers love the eggs; your hat does not.'),
  c('Reprogram it as security','No thief survives a yolk barrage.',{cash:-60000,confidence:9,chaos:5,reputation:2},'AIRBORNE ASSET PROTECTION','The drone guards the vault and one sandwich.'),
  c('Return it to the nest','Some technology needs a nap.',{cash:40000,happiness:4,chaos:-8},'DRONE RESTORED','It sends a thank-you egg.')
 ]),
 e('board-soup','Boardroom Soup','The board retreat’s soup has swallowed the agenda, a pen, and possibly a director.','investor',[
  c('Drink the evidence','Leadership requires sacrifice.',{cash:80000,confidence:8,happiness:-4,chaos:13},'A COURSE-CORRECTING MEAL','The agenda is recovered al dente.'),
  c('Declare soup a board member','It has absorbed enough minutes.',{cash:120000,confidence:-3,reputation:5,chaos:18},'THE SOUP HAS VOTING RIGHTS','It votes unanimously for more soup.'),
  c('Cancel the retreat','Everyone can be confused at home.',{cash:-20000,happiness:6,confidence:2,chaos:-5},'A BROTH OF FRESH AIR','The missing director walks out holding a ladle.')
 ]),
 e('egg-forecast','The Egg Weather Report','Your meteorologist predicts a 90% chance of eggs, indoors.','market',[
  c('Monetise umbrellas','Preparedness is profitable.',{cash:190000,reputation:7,confidence:5,chaos:8},'RAINING REVENUE','Umbrellas sell out to confused commuters.'),
  c('Cancel all meetings','Safety first, calendars later.',{cash:-70000,happiness:12,confidence:-4,chaos:-2},'A PRODUCTIVE STORM','Employees enjoy the unexpected egg day.'),
  c('Challenge the forecast','Ask the clouds for sources.',{cash:30000,confidence:-7,reputation:-3,chaos:10},'THE SKY DECLINES COMMENT','It rains eggs specifically on your car.')
 ]),
 e('hr-ghosting','HR Has Ghosted HR','Your HR manager resigned by leaving a single ghost emoji on the intranet.','people',[
  c('Promote a potato','Internal mobility, underground style.',{cash:-40000,happiness:11,confidence:2,chaos:6},'A ROOTED APPOINTMENT','The new HR lead rejects its own promotion.'),
  c('Outsource to a fortune cookie','Every policy becomes a prophecy.',{cash:-90000,happiness:4,reputation:5,chaos:8},'YOUR BENEFITS SAY “SOON”','The workforce receives surprisingly hopeful paperwork.'),
  c('Handle HR yourself','How hard can empathy be?',{cash:60000,happiness:-16,confidence:-5,chaos:13},'SELF-SERVICE LEADERSHIP','You approve your own complaint and close the ticket.')
 ]),
 e('egg-lawyer','The Egg Lawyer','A boiled egg sends a cease-and-desist claiming your logo infringes on its oval.','legal',[
  c('Settle with breakfast','Peace is best served warm.',{cash:-70000,reputation:6,chaos:-2},'A HARD-BOILED AGREEMENT','The egg withdraws the suit after being buttered.'),
  c('Fight the yolk','Your counsel loves a shell game.',{cash:-220000,confidence:7,chaos:14,reputation:2},'THE CASE CRACKS OPEN','The jury cannot agree whether lunch is evidence.'),
  c('Change logo to a square','Adaptation beats litigation.',{cash:-80000,confidence:-3,reputation:8,chaos:11},'BRAND IN A CORNER','The competitor sends a thank-you card.')
 ]),
 e('cashier-crow','The Crow Cashier','A crow has learned the cash register and is charging customers in shiny buttons.','finance',[
  c('Hire the crow','It has excellent till discipline.',{cash:160000,happiness:5,confidence:6,chaos:10},'A BIRD OF BUSINESS','Revenue rises and buttons become strangely valuable.'),
  c('Trade it shiny coins','A fair severance package.',{cash:-30000,chaos:-4,reputation:3},'CORVID NEGOTIATIONS','The crow leaves with your cufflinks.'),
  c('Accuse it of embezzlement','Make an example of the beak.',{cash:40000,confidence:-8,reputation:-8,chaos:15},'THE CROW PLEADS NOT GUILTY','Every crow in town posts your address.')
 ]),
 e('egg-forecast2','The Forecasting Hen','A hen predicts a management crisis unless given a corner office and three cushions.','productivity',[
  c('Fund the prophecy','Consultants love certainty.',{cash:-100000,confidence:10,chaos:8,eggs:90},'THE HEN KNOWS','The crisis is avoided because everyone is in the cushion room.'),
  c('Ask for evidence','Forecasts need footnotes.',{cash:20000,confidence:5,chaos:3},'A PECK-REVIEWED MODEL','The hen supplies a graph made of crumbs.'),
  c('Ignore the omen','The future can file a ticket.',{cash:60000,confidence:-9,happiness:-5,chaos:15},'THE FORECAST ARRIVES','It is mostly a cushion-related crisis.')
 ]),
 e('board-chickens','Board of Chickens Ultimatum','The board demands layoffs, a miracle, and your resignation in that order.','investor',[
  c('Lay off the paperwork','Nobody likes forms anyway.',{cash:180000,happiness:-8,confidence:12,chaos:5,reputation:-2},'EFFICIENCY BY SHREDDER','The board is impressed; the forms are not.'),
  c('Pitch a miracle merger','Merge with a bakery.',{cash:250000,confidence:9,reputation:6,chaos:14},'THE RISE OF THE BREAD EGG','Investors call it vertical integration.'),
  c('Resign theatrically','Exit through a cloud of confetti.',{cash:-10000,happiness:6,confidence:-20,chaos:19},'YOU RESIGN FROM RESIGNING','The board rejects your resignation for lack of formatting.')
 ]),
 e('intern-robot','The Intern Built a Robot','The intern’s productivity robot has replaced itself with a second robot.','productivity',[
  c('Deploy the robot swarm','Automate first, ask later.',{cash:-230000,eggs:220,confidence:11,chaos:16},'ROBOTICALLY PROMISING','The robots achieve a 40-hour workweek in nine minutes.'),
  c('Give the robots bananas','Motivation remains universal.',{cash:-60000,happiness:10,chaos:9},'THE BANANA PROTOCOL','The robots form a fruit-based org chart.'),
  c('Unplug the original','One robot must be sacrificed.',{cash:80000,confidence:-6,happiness:-4,chaos:-3},'A VERY HUMAN RESOURCE','The second robot files a grievance.')
 ]),
 e('revenue-parachute','Revenue Parachute','The CFO suggests selling parachutes for a projected fall in revenue.','finance',[
  c('Sell premium parachutes','Fear is a subscription.',{cash:240000,reputation:7,confidence:7,chaos:10},'A SOFT LANDING','Sales soar because nobody understands the metaphor.'),
  c('Use them as tablecloths','Pivot hard, land softly.',{cash:-40000,happiness:7,reputation:3,chaos:4},'A DINING DESCENT','The board enjoys the décor and ignores the forecast.'),
  c('Jump without them','Demonstrate confidence.',{cash:-260000,confidence:-15,happiness:-6,chaos:20},'THE FORECAST WAS RIGHT','You land in the annual report.')
 ]),
 e('egg-court','The Egg Court Summons','A tiny courthouse summons the company for crimes against breakfast.','legal',[
  c('Hire a barrister goose','It has a commanding honk.',{cash:-160000,confidence:10,reputation:5,chaos:8},'A HONK IN COURT','The goose wins on volume and feathers.'),
  c('Represent yourself','You are technically the CEO.',{cash:60000,confidence:-11,reputation:-4,chaos:12},'OBJECTION: CLUCK','The judge orders a recess for everyone’s dignity.'),
  c('Plead delicious','Truth is the strongest seasoning.',{cash:-70000,reputation:9,chaos:5,happiness:4},'A TASTY DEFENCE','The court dismisses the case and requests catering.')
 ]),
 e('final-audit','The Final Audit Arrives Early','The auditor arrives on day three wearing your old CEO badge.','rare',[
  c('Show the honest books','Courage, binders, and one receipt.',{cash:-90000,confidence:15,reputation:10,chaos:-8},'AUDITALLY RESPONSIBLE','The auditor finds chaos, but also a system.'),
  c('Distract with a parade','Nothing hides numbers like brass.',{cash:-140000,happiness:12,confidence:-4,chaos:18},'THE MARCH OF LEDGERS','The auditor joins the parade and forgets the question.'),
  c('Offer premium air','A breath of fresh compliance.',{cash:150000,confidence:-14,reputation:-6,chaos:15},'THE AUDIT HOLDS ITS BREATH','The auditor leaves with a jar and a warning.')
 ])
]

export const FIRST_EVENT = EVENTS[0]
