#!/usr/bin/env python3
# Generates the nine "questions we answer" article pages in perspectives/.
# Re-run after editing ARTICLES to regenerate.
from pathlib import Path

ROOT = Path(__file__).parent
OUT = ROOT / "perspectives"
OUT.mkdir(exist_ok=True)

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | Aspirean Wealth</title>
<meta name="description" content="{desc}">
<link rel="icon" type="image/png" href="../assets/favicon.png">
<link rel="stylesheet" href="../css/styles.css">
</head>
<body>

<header class="site-header header-dark">
  <a class="brand" href="../index.html" aria-label="Aspirean Wealth home">
    <span class="brand-mark">
      <img class="mk-paper" src="../assets/logo-mark-paper.png" alt="Aspirean Wealth">
      <img class="mk-sage" src="../assets/logo-mark-sage.png" alt="">
    </span>
    <span class="brand-words">
      <img class="ww-paper" src="../assets/logo-wordmark-paper.png" alt="">
      <img class="ww-ink" src="../assets/logo-wordmark-ink.png" alt="">
    </span>
  </a>
  <button class="nav-toggle" aria-expanded="false" aria-controls="nav">Menu</button>
  <nav class="nav" id="nav" aria-label="Primary">
    <a href="../perspectives.html">Perspectives</a>
    <a href="../case-studies.html">Case studies</a>
    <a href="../about.html">About</a>
    <a class="nav-cta" href="../contact.html">Meet with us</a>
    <a class="nav-portal" href="../client-portal.html">Client Portal</a>
  </nav>
</header>

<main>
  <section class="article-hero">
    <div class="wrap">
      <p class="eyebrow">{eyebrow}</p>
      <h1>{h1}</h1>
      <p class="article-meta">{date} &middot; Aspirean Wealth</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <a class="link-quiet article-back" href="../perspectives.html">&larr; All perspectives</a>
      <div class="article">
{body}
        <p class="article-close">{close}</p>
        <p class="article-disclaimer">This piece is general education, not individual advice. Whether any of it applies to you depends on your specifics, which is exactly the conversation to have before acting.</p>
      </div>
    </div>
  </section>

  <section class="section section-tight section-ink on-ink">
    <div class="wrap split reveal">
      <div>
        <p class="eyebrow">Meet with us</p>
        <h2>Bring us the question behind this one.</h2>
      </div>
      <div>
        <p class="prose" style="margin-bottom: 32px; max-width: 52ch;">Every piece here started as a question a client asked. If you&rsquo;re carrying one of your own, we&rsquo;d love the opportunity to talk with you.</p>
        <a class="btn" href="../contact.html">Begin a conversation</a>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer on-ink">
  <div class="footer-grid">
    <div class="footer-col">
      <img src="../assets/logo-wordmark-paper.png" alt="Aspirean Wealth">
      <p style="margin-top: 18px; max-width: 32ch;">Fee-only, fiduciary wealth management for first-generation wealth creators.</p>
    </div>
    <div class="footer-col">
      <h4>Firm</h4>
      <a href="../index.html#what-we-do">What we do</a>
      <a href="../index.html#who-we-serve">Who we serve</a>
      <a href="../index.html#how-we-work">How we work</a>
      <a href="../perspectives.html">Perspectives</a>
    <a href="../case-studies.html">Case studies</a>
      <a href="../about.html">About</a>
      <a href="../contact.html">Contact</a>
    </div>
    <div class="footer-col">
      <h4>Wealth Management</h4>
      <a href="../wealth-management-marin.html">Marin County, CA</a>
      <a href="../wealth-management-st-joseph.html">St. Joseph, MI</a>
      <a href="../wealth-management-chesterton.html">Chesterton, IN</a>
    </div>
    <div class="footer-col">
      <h4>Financial Advisors</h4>
      <a href="../financial-advisors-marin.html">Marin County, CA</a>
      <a href="../financial-advisors-st-joseph.html">St. Joseph, MI</a>
      <a href="../financial-advisors-chesterton.html">Chesterton, IN</a>
    </div>
  </div>
  <div class="footer-line">
    <p>Independent. Fiduciary. Fee-only.</p>
    <p>&copy; 2026 Aspirean Wealth. All rights reserved.</p>
  </div>
</footer>

<script src="../js/vendor/gsap.min.js"></script>
<script src="../js/vendor/ScrollTrigger.min.js"></script>
<script src="../js/vendor/lenis.min.js"></script>
<script src="../js/site.js"></script>
</body>
</html>
"""

def P(*paras):
    return "\n".join(f"        <p>{p}</p>" for p in paras)

def H(text):
    return f"        <h2>{text}</h2>"

ARTICLES = [
# ---------------------------------------------------------------- FOUNDERS 1
dict(
slug="selling-your-business-tax-planning-before-the-exit",
eyebrow="For founders &amp; business owners",
title="Tax Planning Before You Sell the Business",
h1="Selling in the next few years? The planning window is open now.",
desc="For a business owner planning a sale in the next few years, the most valuable tax strategies depend on time. What to coordinate now: QSBS, trust structures, and entity review.",
date="June 12, 2026",
close="Aspirean works with owners who are two to five years from a sale, which is when this coordination is worth the most. If a transaction is somewhere on your horizon, that is the moment to talk, not after the letter of intent arrives.",
body="\n".join([
P("For an owner planning to sell in the next few years, the single most valuable input to tax planning is not a clever structure. It is time. Nearly every meaningful strategy available to a seller either requires a holding period, works best before the company has a negotiated price, or takes months to implement well. The variable your outcome turns on is how early the planning starts relative to the closing date."),
H("Does my stock qualify for the QSBS exclusion, and what changed?"),
P("If your company is a C corporation and meets the requirements of Section 1202, qualified small business stock can exclude an enormous amount of gain from federal tax. For stock acquired on or before July 4, 2025, the old rules apply: hold for more than five years and exclude up to the greater of $10 million or ten times basis. For stock acquired after that date, the 2025 tax law replaced the five-year cliff with tiers: 50 percent of gain excluded at a three-year hold, 75 percent at four years, and 100 percent at five, with the dollar cap raised to $15 million. Two practical consequences follow. First, your acquisition dates now matter enormously, and different lots of your own stock may live under different rules. Second, because the exclusion cap is per taxpayer, gifting shares to family members or trusts well before a sale can multiply the exclusion across your family. That word, before, is doing all the work."),
H("What can trusts actually do for me here?"),
P("Two structures come up in nearly every exit we plan. A charitable remainder trust lets you contribute appreciated shares before the sale, diversify inside the trust without immediate capital gains, draw an income stream for years, and leave the remainder to charity. An installment sale to an intentionally defective grantor trust can move future appreciation of the business out of your taxable estate while you keep the income tax burden, which is itself a further transfer. Both share a defect and a feature: they must be in place, and genuinely so, before the transaction is a foregone conclusion. A trust funded the week after a signed letter of intent invites the IRS to look straight through it."),
H("What about the deal itself?"),
P("Asset sale versus stock sale, earnout structure, rollover equity, the state you sell from: each of these moves your after-tax number, and each is negotiated at a table where your CPA, your attorney, and your banker all hold one piece. The most expensive version of an exit is the one where those three professionals meet each other for the first time during diligence. Someone has to hold the whole picture, and it should not have to be you in the most demanding year of your professional life."),
H("When pre-sale planning works against you"),
P("Tax strategy should never drive the deal. Holding an extra eighteen months to reach a QSBS tier is only smart if the business and the market cooperate, and businesses have a way of not cooperating. Irrevocable structures are exactly that, and an owner who over-transfers before a sale that then falls through has given up flexibility for nothing. The honest rule: decide how much is enough for your family first, secure that, and let the strategies apply to what is above the line."),
H("The principle to carry"),
P("Every strategy on this page gets weaker as the closing date gets closer, and most of them switch off entirely once a price is agreed. If a sale is plausible within five years, the planning conversation is not premature. It is on time."),
]),
),
# ---------------------------------------------------------------- FOUNDERS 2
dict(
slug="business-concentration-when-to-diversify",
eyebrow="For founders &amp; business owners",
title="When to Start Diversifying Away From Your Business",
h1="The business is most of your net worth. When is that a problem?",
desc="For an owner whose company is the overwhelming majority of their net worth, diversification is about securing the family's baseline, not doubting the business.",
date="May 21, 2026",
close="Aspirean works with owners navigating exactly this tension, usually starting years before any transaction. If your balance sheet is mostly one private company, that is the conversation to have.",
body="\n".join([
P("For most successful owners, concentration is not a mistake to be corrected. It is the reason the wealth exists. No diversified portfolio built your company. So the honest question is not whether concentration is bad, it is what happens to your family if the concentrated bet has a bad decade. The variable that decides when to diversify is not the business's expected return. It is the consequence of being wrong."),
H("How much is enough outside the business?"),
P("Our working answer: enough that your family's baseline life is secure even if the business were worth nothing. Housing, education, retirement at a standard you would accept. Call it the base. For a young company still compounding, the base might be modest. For an owner in their fifties whose company is worth eight figures on paper and ninety percent of their net worth, an unsecured base is the single largest risk in their financial life, and it is a risk no investment return justifies, because the marginal dollar of upside changes very little while the downside changes everything."),
H("What are the ways to actually do it?"),
P("Diversification rarely means selling the company. The ordinary tools come first: disciplined distributions invested outside the business rather than recycled into it, retirement plan contributions that shelter income while building an external balance sheet, and insurance sized to the key-person risk that you are. Further along the spectrum sit partial liquidity events: taking on a minority investor, a recapitalization that lets you pull chips off the table while keeping control, or selling a division. Each converts some paper wealth into a real, diversified base without ending the story of the business."),
H("Doesn't pulling money out slow the business down?"),
P("Sometimes, and that is a real cost. Capital left inside a company you control and understand often earns more than a stock index. The discipline is to name the tradeoff honestly rather than let it decide by default. Owners almost never regret having secured the base. They frequently regret having reinvested every dollar right up to the moment the industry turned, the partner left, or the health event arrived."),
H("When diversifying early is the wrong call"),
P("A company in its steep growth phase, funded by an owner with a long runway and a tolerant balance sheet, can reasonably stay concentrated. Borrowing against the business to diversify is usually a poor trade, since it adds fragility in the name of reducing it. And selling meaningful equity at the wrong moment to buy a portfolio is a decision that cannot be unwound. The point is not maximal diversification. It is that concentration should be a decision you make each year, not a condition you drifted into."),
H("The principle to carry"),
P("You already own the upside. The planning question is who owns the downside. Secure the base first, and every future decision about the business gets made from strength instead of necessity."),
]),
),
# ---------------------------------------------------------------- FOUNDERS 3
dict(
slug="after-the-sale-making-the-proceeds-last",
eyebrow="For founders &amp; business owners",
title="After the Sale: Making the Proceeds Last",
h1="The wire cleared. Now make it last a lifetime.",
desc="For a founder who just sold, the skills that built the company are not the skills that preserve the proceeds. What changes, what to do first, and what to resist.",
date="April 16, 2026",
close="Aspirean regularly begins working with founders in the season right after a sale, when the proceeds are still in cash and the habits are still forming. That first year sets the trajectory, and it is the best time to talk.",
body="\n".join([
P("The uncomfortable truth about a successful exit is that the skills that produced the money are close to the opposite of the skills that preserve it. Building a company rewards concentration, control, and decisive action. Living off a portfolio rewards diversification, patience, and the discipline to do very little. The variable your next forty years turn on is not investment selection. It is your spending rate relative to the portfolio, and the honesty with which you set it."),
H("What should I do in the first six months?"),
P("Less than you think. Park the proceeds safely, get the tax bill for the sale year modeled precisely so the money owed to the IRS never feels spendable, and resist every major decision that is not forced. There is a documented pattern of sellers making their worst financial moves in the first year, when the number is new and everyone with a private deal has your phone number. A deliberate waiting period is not indecision. It is strategy."),
H("How does the money actually replace my income?"),
P("Through structure, not yield-chasing. A globally diversified portfolio built on decades of peer-reviewed evidence, a cash and short-term bond layer covering several years of spending so a bad market never forces a sale at the bottom, and a withdrawal plan coordinated across taxable and retirement accounts so the tax cost of each dollar of income is deliberate. The portfolio's job is no longer to make you rich. It already did that. Its job now is to never un-make you rich, which is a different mandate with different mathematics."),
H("What do sellers get wrong?"),
P("Two things, reliably. The first is recreating the risk they just cashed out of, usually through private deals and angel positions that feel familiar and arrive with social pressure attached. A small, honest allocation to that world is fine. Rebuilding concentration by accident is not. The second is anchoring spending to the peak number on the closing statement rather than to what the after-tax, invested portfolio can sustainably produce. The gap between those two figures is where fortunes quietly leak."),
H("When patience becomes its own mistake"),
P("The waiting period should end. Proceeds sitting in cash for years lose ground to inflation with certainty, which is a worse guarantee than market volatility offers. And for some founders, a next act is the right call. The test is whether the family's permanent security is ring-fenced first, so the next venture risks surplus rather than the base."),
H("The principle to carry"),
P("You spent decades converting effort into a number. The work now is converting the number into a life, at a rate it can sustain. Set the spending rate honestly and the rest of the plan mostly writes itself."),
]),
),
# ---------------------------------------------------------------- EXECUTIVES 1
dict(
slug="concentrated-company-stock-how-much-is-too-much",
eyebrow="For equity-compensated executives",
title="Concentrated Company Stock: How Much Is Too Much",
h1="The stock keeps vesting. How concentrated is too concentrated?",
desc="For an executive accumulating RSUs, holding vested shares is an active decision to buy. How to think about single-stock concentration when your salary depends on the same company.",
date="June 2, 2026",
close="Aspirean builds diversification plans for executives whose net worth and paycheck share a ticker symbol. If your vested position has quietly become the plan, that is the moment to talk.",
body="\n".join([
P("Start with the fact that reframes everything: an RSU is taxed as ordinary income the day it vests, at its value that day. Holding the shares afterward has the same economics as receiving cash and immediately buying your company's stock with it. Nobody who received a cash bonus would put the entire bonus into one stock every quarter, yet that is precisely what holding every vested share amounts to. The variable that decides how much is too much is not the stock's prospects. It is what fraction of your future already depends on this one company."),
H("Why is a single stock different from the market?"),
P("Because most individual stocks are worse than the index they live in. The market's long-term return is driven by a small minority of extraordinary winners; the median stock underperforms, and a meaningful share of large companies eventually suffer a drawdown they never recover from. Owning the market gets you the winners by construction. Owning one company is a bet that yours is among them, made with money you cannot afford to be wrong about, by someone whose salary, bonus, unvested grants, and professional network are already riding on the same outcome."),
H("So what is the number?"),
P("A common rule of thumb caps any single stock at ten to fifteen percent of investable assets, but for an executive the honest ceiling is usually lower, because the rule of thumb ignores your human capital. Your paycheck is a bond issued by your employer. Your unvested pipeline is a call option on the same name. Count those honestly and a portfolio that looks twenty percent concentrated is often closer to half your economic life on one ticker. We would rather define it by consequence: the position is too large when a fifty percent decline, which happens to good companies with some regularity, would change your family's plans."),
H("What does managing it actually look like?"),
P("For most executives, the clean baseline is selling RSUs at vest, since vest-date taxation means selling immediately adds little or no additional tax, and directing proceeds into a diversified portfolio. Around that baseline: tax-aware selling of older appreciated lots, charitable gifting of the lowest-basis shares, and for insiders, a Rule 10b5-1 plan that automates the schedule. The mechanics matter less than the decision to have a policy at all, because the alternative is deciding share by share, forever, with your judgment clouded by loyalty and recency."),
H("The honest case for holding some"),
P("Conviction is not irrational, and some concentration is a defensible choice, made in a size you can afford to lose. There are also real frictions: blackout windows, ownership guidelines for senior officers, a large embedded gain in old lots. These shape the pace of diversification. They are not arguments against having a plan."),
H("The principle to carry"),
P("Holding is buying. Once that sentence feels true, the rest is engineering: pick the ceiling, automate the path down to it, and let the plan do what willpower will not."),
]),
),
# ---------------------------------------------------------------- EXECUTIVES 2
dict(
slug="10b5-1-plans-diversifying-as-an-insider",
eyebrow="For equity-compensated executives",
title="Rule 10b5-1 Plans: Diversifying as an Insider",
h1="You want to diversify. You're also an insider. Enter the 10b5-1 plan.",
desc="For an executive with trading windows and MNPI exposure, a Rule 10b5-1 plan turns diversification into a pre-committed schedule. How the plans work after the 2023 amendments.",
date="May 7, 2026",
close="Aspirean designs 10b5-1 programs alongside the executive's broader plan, so the selling schedule serves the diversification target rather than existing for its own sake. If your window keeps closing before you act, that is the moment to talk.",
body="\n".join([
P("For an insider, the obstacle to diversification is rarely conviction. It is the calendar. Trading windows open for a few weeks, close on the rumor of anything material, and have a way of being shut precisely when you finally decided to act. A Rule 10b5-1 plan solves the calendar problem by replacing decisions with a schedule: a written plan, adopted when you hold no material nonpublic information, that sells on autopilot regardless of what you later learn. The variable that makes or breaks these plans is the discipline at adoption, because everything after that is meant to be mechanical."),
H("What actually makes a plan valid?"),
P("The plan must be adopted in good faith, during an open window, while you are not aware of material nonpublic information, and it must fix the amounts, prices, and dates of sales, or hand the formula to someone else entirely. Since the SEC's amendments took effect in 2023, insiders must also certify those conditions in the plan itself, and companies now disclose the adoption and termination of officer and director plans in their quarterly filings. Your sales are visible. That is a feature: a pre-announced, formulaic schedule reads as planning, while opportunistic window trades read as something else."),
H("How long until it starts selling?"),
P("For directors and Section 16 officers, no trade can occur until the later of ninety days after adoption or two business days after the company files the 10-Q or 10-K covering the quarter in which the plan was adopted, capped at 120 days. For employees below that line, the cooling-off period is thirty days. The detail that surprises people: modifying the price, amount, or timing terms counts as adopting a new plan and restarts the clock. Overlapping plans are heavily restricted, and single-trade plans are limited to one in any twelve-month period. The regime is built to reward one thoughtful plan over many clever ones."),
H("What should the schedule actually look like?"),
P("It should be the output of your financial plan, not a guess. If the target is bringing a forty percent position down to fifteen over two years, the plan sells the difference on a regular cadence, sized so that any single sale date matters little. Pure time-based schedules are the most robust. Price limits can be layered in, but every limit is a bet that can strand shares unsold below it for years, which quietly defeats the purpose the plan was built for."),
H("Where these plans go wrong"),
P("Terminating a plan early is legal but corrosive: it invites the question of what you knew, and a pattern of adopting and canceling can undermine the good-faith foundation of every plan you touch. The other failure is treating the plan as a market call rather than a diversification tool, loading it with limit prices that express a view. If you knew the stock's path, you would not need the plan. The plan exists because you do not."),
H("The principle to carry"),
P("A 10b5-1 plan converts a recurring, compromised decision into a single clean one. Make that one decision carefully, in an open window, sized to the plan behind it, and then let it run."),
]),
),
# ---------------------------------------------------------------- EXECUTIVES 3
dict(
slug="iso-exercises-and-the-amt",
eyebrow="For equity-compensated executives",
title="ISO Exercises and the AMT",
h1="Your ISOs are in the money. Now about that AMT warning.",
desc="For an executive holding incentive stock options, the AMT is the toll on the road to capital-gains treatment. How the spread at exercise drives the decision, and when the trap snaps shut.",
date="April 2, 2026",
close="Aspirean models ISO exercises inside the client's full tax picture, usually across several years, before a single share is exercised. If your option grant has quietly become a real number, that is the moment to talk.",
body="\n".join([
P("Incentive stock options carry a genuine prize: exercise, hold the shares long enough, and the gain from your strike price to the eventual sale is taxed as long-term capital gain rather than ordinary income. The toll on that road is the alternative minimum tax. When you exercise an ISO and hold the shares, the spread between strike and fair market value that day is income for AMT purposes, even though no cash arrived. Everything about the decision turns on one variable: the size of the spread at the moment you exercise."),
H("Why does everyone tell a horror story about this?"),
P("Because the failure mode is real and has a history. An executive exercises when the spread is large, owes AMT on paper income, and then watches the stock fall below the price that generated the tax. The dot-com era produced people who owed more in tax than their shares were ever worth again. The lesson is not that ISOs are dangerous. It is that exercising a large spread with no liquidity and no plan is dangerous, and the same exercise done earlier, smaller, or with a sale plan attached is a different decision entirely."),
H("So when does exercising make sense?"),
P("When the spread is small, the toll is small. That is the logic of exercising early in a company's life, or exercising in measured annual tranches sized so the AMT consequence in any single year stays digestible. It is also the logic of the qualifying-disposition clock: shares must be held more than two years from grant and one year from exercise for the gain to qualify, so each year you wait to start is a year the capital-gains treatment moves further out. And AMT paid on an exercise is not entirely gone; much of it generates a credit that can return in later years, which makes the AMT closer to a prepayment than a pure cost, provided you can carry it."),
H("When should I just take the ordinary income?"),
P("Sometimes the prize is not worth the road. Selling shares in a disqualifying disposition converts the spread to ordinary income, which sounds like failure but is often the right call: when the position is dangerously concentrated, when the company is private and the shares cannot be sold to cover the tax, or when the spread has grown so large that holding for capital-gains treatment means betting a life-changing sum on one stock for another year. Paying ordinary income tax on a certain gain beats capital-gains treatment on a gain that evaporates."),
H("The honest limit"),
P("ISO planning is a multi-year modeling exercise, not a rule of thumb. The AMT calculation interacts with your other income, your state, the credit recovery, and the concentration question that sits underneath all of it. Any advice that fits in a sentence is wrong for someone."),
H("The principle to carry"),
P("Exercise decisions are spread decisions. Small spread, small toll, easy call. Large spread, real toll, and the question stops being about taxes and starts being about how much of your net worth belongs on one company's chart."),
]),
),
# ---------------------------------------------------------------- FAMILIES 1
dict(
slug="sudden-wealth-the-first-year",
eyebrow="For families &amp; stewards",
title="Sudden Responsibility: The First Year",
h1="It's suddenly yours to manage. Here's what the first year actually requires.",
desc="For someone who has just inherited assets or lost the spouse who managed them, the first year divides into what is genuinely urgent and what only feels urgent.",
date="March 12, 2026",
close="Aspirean works with widows and inheritors from the very first weeks, with both spouses treated as equal clients long before that moment ever comes. If the responsibility has just landed on you, you do not have to sort urgent from noisy alone.",
body="\n".join([
P("The most useful thing to know in the first year is that almost nothing is as urgent as it feels. Grief and money arrive together, and the industry that surrounds money tends to press for decisions precisely when you are least equipped to make them. The first year divides into a short list of things that genuinely have deadlines and a long list of things that only feel like they do. The variable that protects you is knowing which list you are looking at."),
H("What is actually urgent?"),
P("Cash flow comes first: knowing which accounts pay the bills for the next six months, and making sure they can. Then the administrative floor: death certificates, retitling accounts, claiming life insurance, and the estate settlement process itself. Two deadlines deserve respect because they are real and unforgiving. An estate tax return electing portability, which preserves a deceased spouse's unused federal exemption for the survivor, runs on a clock measured in months from the date of death. And a qualified disclaimer, if any inheritance should pass to someone else, generally must happen within nine months. These are the calls to make early, with a professional, even while everything else waits."),
H("What can wait, and should?"),
P("The portfolio. The house. The gifts to children. The well-meaning brother-in-law's investment idea. There is no penalty for leaving a sensible portfolio alone for a year, and there is a large, well-documented penalty for wholesale financial decisions made in the first months of grief. One genuine piece of good news supports the patience: inherited assets generally receive a step-up in basis to their value at death, which means appreciated positions can usually be sold or diversified later with little built-in tax cost. The tax code, for once, is not rushing you."),
H("Who should be around the table?"),
P("An estate attorney for the settlement, a CPA for the final and estate tax returns, and an advisor whose job is coordination and translation, in that order of urgency. The standard to hold every one of them to is plain language. If a professional cannot explain a recommendation in a sentence you understand, the problem is the recommendation, not you."),
H("When waiting becomes avoiding"),
P("The decision-free period should have an end date. Accounts left untitled invite problems, insurance proceeds parked in cash for years quietly lose ground, and a portfolio built around a previous life eventually needs to reflect the current one. Twelve months is a reasonable horizon for moving from stabilizing to planning. The goal was never to avoid decisions. It was to make them once, calmly, in the right order."),
H("The principle to carry"),
P("Protect the truly urgent, defer everything else, and let the first year be about stability rather than optimization. The good decisions will still be available in month thirteen. The bad ones are the ones that could not wait."),
]),
),
# ---------------------------------------------------------------- FAMILIES 2
dict(
slug="turning-assets-into-income",
eyebrow="For families &amp; stewards",
title="Turning Assets Into Income You Can Count On",
h1="How do you turn what you have into a paycheck that lasts?",
desc="For a family living off assets rather than earnings for the first time, income is a structure, not a product. Spending rate, account coordination, and the buffer that makes it durable.",
date="February 18, 2026",
close="Aspirean builds income plans for families making exactly this transition, in plain language, with both spouses in the room as equals. If the paycheck question has arrived at your house, that is the moment to talk.",
body="\n".join([
P("A paycheck is a rhythm, and losing that rhythm is more unsettling than most financial changes. The instinct is to go shopping for income: dividend stocks, annuity pitches, whatever yields the most this year. The evidence points elsewhere. Sustainable income is a structure built from an ordinary diversified portfolio, and the number that governs everything is not the yield on any product. It is your spending rate: what you draw each year as a percentage of what you have."),
H("What is a safe rate to draw?"),
P("Decades of research on retirement withdrawals converge on a range in the neighborhood of four percent of the starting portfolio, adjusted over time, lasting through most historical market sequences. But the honest answer is that the right rate is personal and slightly flexible. A plan that can trim spending modestly after a bad market year can safely start higher than a plan that cannot bend at all. What matters is that the rate is chosen deliberately, tested against bad sequences rather than average ones, and revisited on a schedule."),
H("Where does the money actually come from each month?"),
P("From structure. A cash and short-term bond layer holds roughly two to three years of planned spending, so that a market decline never forces selling stocks at the bottom; the diversified portfolio behind it does the long-term work; and a monthly transfer lands in checking like the paycheck it replaces. The order of withdrawals matters too. Coordinating which account each dollar comes from, taxable, tax-deferred, or Roth, and how that sequence interacts with Social Security timing and future required distributions, often adds more to a family's outcome than any investment selection, because it is tax the plan simply declines to pay."),
H("What about products that promise the income for you?"),
P("Some have a place. A simple income annuity covering a floor of essential expenses can be a rational purchase, especially for a family that sleeps better with a guarantee. But guarantees are priced, and the complex versions layered with riders and caps tend to be sold hardest to people in exactly your situation. The test is whether you can explain what you own and what it costs. If you cannot, it is not the right product, whatever the brochure says."),
H("The limit worth respecting"),
P("No structure removes sequence risk entirely, and no honest plan claims to. A severe market decline early in the drawdown years is the scenario every income plan must be built against, which is precisely what the cash buffer and the flexible spending rate exist to absorb. The plan does not promise the markets will behave. It promises your groceries do not depend on them behaving this year."),
H("The principle to carry"),
P("Income is not something you buy. It is something you build from spending rate, structure, and sequence, in that order. Get those three right and the portfolio behind them can be refreshingly ordinary."),
]),
),
# ---------------------------------------------------------------- FAMILIES 3
dict(
slug="taking-over-the-family-finances",
eyebrow="For families &amp; stewards",
title="Taking Over the Family Finances",
h1="Your spouse handled everything. Here's how to take over without an expensive mistake.",
desc="For the spouse who was never the one managing money, taking over is a context problem, not a competence problem. The inventory, the beneficiary audit, and the standard to hold advisors to.",
date="February 3, 2026",
close="Aspirean insists on both spouses as equal clients precisely so this moment is never a cold start. But when it already is one, we help stewards take over deliberately, in plain language, at their own pace. That first conversation is the moment to talk.",
body="\n".join([
P("Start with the reframe that changes the whole project: this is not a competence problem, it is a context problem. You are not learning finance from zero. You are missing a map that lived in one person's head, and the work of the first months is drawing that map before making any decision that depends on it. The variable that determines how this goes is the gap between what the documents say and what your family actually intends, because that gap is where the expensive mistakes live."),
H("Where do I even start?"),
P("With an inventory, not a strategy. Every account and where it lives, every insurance policy, every recurring bill and the account that pays it, every advisor and what they actually do, every password. Tax returns are the cheat sheet: the last two years of filings list the accounts that earn interest and dividends, the ones nobody remembered to mention. The inventory is boring, takes weeks, and is worth more than any investment decision you could make in the same period, because every future decision depends on it being complete."),
H("What's the mistake that actually costs money?"),
P("Stale beneficiary designations. Retirement accounts and life insurance pass by the name written on the beneficiary form, not by the will, and the form wins even when it is decades old and names the wrong person. An IRA left to a previous spouse, a trust that says one thing while the account titling says another: these are the quiet failures that surface at the worst possible moment and are usually unfixable by then. The beneficiary and titling audit is unglamorous, and it is the single highest-value hour in the whole transition."),
H("Should I keep the old advisor?"),
P("Maybe, but on new terms, and the terms are yours. The relationship was built around your spouse; the useful test is whether it works for you. Ask three things of anyone who wants to manage your family's money: are you a fiduciary at all times and in writing, how exactly are you paid, and can you explain your last recommendation in plain language. Hold the explanations to that standard permanently. If understanding the advice requires pretending to understand it, the problem is the advisor. There is also a documented tendency for surviving spouses, especially widows, to be treated as accounts to retain rather than clients to serve. You will feel the difference quickly."),
H("The honest limit"),
P("Not everything should be preserved, and not everything should be changed. A spouse's old portfolio is not a monument, and keeping every position out of loyalty can quietly carry more risk than the family should hold. The discipline is sequencing: inventory first, beneficiaries and titling second, the team third, and only then the portfolio, each step at a pace you set."),
H("The principle to carry"),
P("Draw the map before you drive. The inventory and the beneficiary audit come before any investment decision, and anyone pressuring you to reverse that order has told you something useful about themselves."),
]),
),
]

for a in ARTICLES:
    html = PAGE.format(
        title=a["title"], desc=a["desc"], eyebrow=a["eyebrow"], h1=a["h1"],
        date=a["date"], body=a["body"], close=a["close"],
    )
    (OUT / f"{a['slug']}.html").write_text(html)
    print("wrote", a["slug"])
print(f"{len(ARTICLES)} articles generated")

# ---------------------------------------------------------------- CATEGORY PAGES
CATEGORY_PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{name} | Perspectives | Aspirean Wealth</title>
<meta name="description" content="{desc}">
<link rel="icon" type="image/png" href="../assets/favicon.png">
<link rel="stylesheet" href="../css/styles.css">
</head>
<body>

<header class="site-header header-dark">
  <a class="brand" href="../index.html" aria-label="Aspirean Wealth home">
    <span class="brand-mark">
      <img class="mk-paper" src="../assets/logo-mark-paper.png" alt="Aspirean Wealth">
      <img class="mk-sage" src="../assets/logo-mark-sage.png" alt="">
    </span>
    <span class="brand-words">
      <img class="ww-paper" src="../assets/logo-wordmark-paper.png" alt="">
      <img class="ww-ink" src="../assets/logo-wordmark-ink.png" alt="">
    </span>
  </a>
  <button class="nav-toggle" aria-expanded="false" aria-controls="nav">Menu</button>
  <nav class="nav" id="nav" aria-label="Primary">
    <a href="../perspectives.html">Perspectives</a>
    <a href="../case-studies.html">Case studies</a>
    <a href="../about.html">About</a>
    <a class="nav-cta" href="../contact.html">Meet with us</a>
    <a class="nav-portal" href="../client-portal.html">Client Portal</a>
  </nav>
</header>

<main>
  <section class="article-hero">
    <div class="wrap">
      <p class="eyebrow">Perspectives</p>
      <h1>{name}</h1>
      <p class="lead" style="color: var(--paper-soft); max-width: 56ch; margin-top: 20px;">{intro}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <a class="link-quiet article-back" href="../perspectives.html">&larr; All perspectives</a>
      <div class="post-list">
{posts}
      </div>
    </div>
  </section>

  <section class="section section-tight section-ink on-ink">
    <div class="wrap split reveal">
      <div>
        <p class="eyebrow">Meet with us</p>
        <h2>Bring us the question behind these.</h2>
      </div>
      <div>
        <p class="prose" style="margin-bottom: 32px; max-width: 52ch;">Every piece here started as a question a client asked. If you&rsquo;re carrying one of your own, we&rsquo;d love the opportunity to talk with you.</p>
        <a class="btn" href="../contact.html">Begin a conversation</a>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer on-ink">
  <div class="footer-grid">
    <div class="footer-col">
      <img src="../assets/logo-wordmark-paper.png" alt="Aspirean Wealth">
      <p style="margin-top: 18px; max-width: 32ch;">Fee-only, fiduciary wealth management for first-generation wealth creators.</p>
    </div>
    <div class="footer-col">
      <h4>Firm</h4>
      <a href="../index.html#what-we-do">What we do</a>
      <a href="../index.html#who-we-serve">Who we serve</a>
      <a href="../index.html#how-we-work">How we work</a>
      <a href="../perspectives.html">Perspectives</a>
      <a href="../case-studies.html">Case studies</a>
      <a href="../about.html">About</a>
      <a href="../contact.html">Contact</a>
    </div>
    <div class="footer-col">
      <h4>Wealth Management</h4>
      <a href="../wealth-management-marin.html">Marin County, CA</a>
      <a href="../wealth-management-st-joseph.html">St. Joseph, MI</a>
      <a href="../wealth-management-chesterton.html">Chesterton, IN</a>
    </div>
    <div class="footer-col">
      <h4>Financial Advisors</h4>
      <a href="../financial-advisors-marin.html">Marin County, CA</a>
      <a href="../financial-advisors-st-joseph.html">St. Joseph, MI</a>
      <a href="../financial-advisors-chesterton.html">Chesterton, IN</a>
    </div>
  </div>
  <div class="footer-line">
    <p>Independent. Fiduciary. Fee-only.</p>
    <p>&copy; 2026 Aspirean Wealth. All rights reserved.</p>
  </div>
</footer>

<script src="../js/vendor/gsap.min.js"></script>
<script src="../js/vendor/ScrollTrigger.min.js"></script>
<script src="../js/vendor/lenis.min.js"></script>
<script src="../js/site.js"></script>
</body>
</html>
"""

# question, article slug, blurb, date
CATEGORIES = [
dict(
    slug="business-exits-and-liquidity",
    name="Business Exits &amp; Liquidity Events",
    desc="For owners approaching a sale, recapitalization, or the years right after one: pre-exit tax planning, concentration, and making the proceeds last.",
    intro="You spent decades building the asset. These pieces are about the handful of years, before and after the transaction, when the decisions matter most.",
    items=[
        ("&ldquo;I&rsquo;m planning to sell in the next few years. What can I do now to keep more of what I&rsquo;ve built?&rdquo;",
         "selling-your-business-tax-planning-before-the-exit",
         "Nearly every strategy worth having, from the QSBS exclusion to pre-sale trusts, gets weaker as the closing date gets closer.",
         "June 12, 2026"),
        ("&ldquo;My business is most of my net worth. When should I start diversifying, and how much is enough?&rdquo;",
         "business-concentration-when-to-diversify",
         "Concentration built the wealth. The question is what happens to your family if the bet has a bad decade.",
         "May 21, 2026"),
        ("&ldquo;The sale closed. How do I make this money last the rest of my life?&rdquo;",
         "after-the-sale-making-the-proceeds-last",
         "The skills that built the company are nearly the opposite of the skills that preserve the proceeds.",
         "April 16, 2026"),
    ],
),
dict(
    slug="equity-compensation",
    name="Equity Compensation &amp; Concentrated Stock",
    desc="For executives with RSUs, options, and insider constraints: concentration ceilings, Rule 10b5-1 plans, and ISO exercises without the AMT surprise.",
    intro="Your compensation arrives as shares, your calendar arrives as trading windows, and your net worth quietly concentrates on one ticker. These pieces are about taking that back under control.",
    items=[
        ("&ldquo;The stock keeps vesting and keeps climbing. How concentrated is too concentrated?&rdquo;",
         "concentrated-company-stock-how-much-is-too-much",
         "An RSU is taxed at vest, so holding the shares is an active decision to buy them, every quarter.",
         "June 2, 2026"),
        ("&ldquo;I want to diversify, but I&rsquo;m an insider. How do I sell without tripping over trading windows?&rdquo;",
         "10b5-1-plans-diversifying-as-an-insider",
         "A Rule 10b5-1 plan replaces window-by-window decisions with a pre-committed schedule that sells on autopilot.",
         "May 7, 2026"),
        ("&ldquo;My ISOs are in the money. Should I exercise, and why does everyone warn me about the AMT?&rdquo;",
         "iso-exercises-and-the-amt",
         "The spread at exercise drives everything: the tax toll, the timing, and whether the prize is worth the road.",
         "April 2, 2026"),
    ],
),
dict(
    slug="family-wealth-and-stewardship",
    name="Family Wealth &amp; Stewardship",
    desc="For inheritors, widows, and the newly responsible: the first year, turning assets into dependable income, and taking over without an expensive mistake.",
    intro="Sometimes the biggest financial moment isn&rsquo;t a transaction. It&rsquo;s becoming the one responsible. These pieces are about carrying that well, at your own pace.",
    items=[
        ("&ldquo;It&rsquo;s suddenly mine to manage. What actually needs to happen in the first year?&rdquo;",
         "sudden-wealth-the-first-year",
         "Almost nothing is as urgent as it feels. The short list of real deadlines, and the long list that can wait.",
         "March 12, 2026"),
        ("&ldquo;How do we turn what we have into income we can count on?&rdquo;",
         "turning-assets-into-income",
         "Income isn&rsquo;t something you buy. It&rsquo;s built from a spending rate, a cash buffer, and a withdrawal order.",
         "February 18, 2026"),
        ("&ldquo;My spouse handled everything. How do I take this over without an expensive mistake?&rdquo;",
         "taking-over-the-family-finances",
         "A context problem, not a competence problem. The inventory, the beneficiary audit, and the standard to hold every advisor to.",
         "February 3, 2026"),
    ],
),
]

def cat_post(q, slug, blurb, date):
    return f'''        <article class="post reveal">
          <p class="post-date">{date}</p>
          <div>
            <h3><a href="{slug}.html">{q}</a></h3>
            <p>{blurb}</p>
            <p style="margin-top: 14px;"><a class="link-quiet" href="{slug}.html">Read the answer</a></p>
          </div>
        </article>'''

for c in CATEGORIES:
    posts = "\n\n".join(cat_post(*i) for i in c["items"])
    html = CATEGORY_PAGE.format(name=c["name"], desc=c["desc"], intro=c["intro"], posts=posts)
    (OUT / f"{c['slug']}.html").write_text(html)
    print("wrote category:", c["slug"])
