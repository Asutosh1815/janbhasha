// Benchmark Classroom Sentences (CIIL Mysore / Bhashini / NIPUN Bharat Verified)
// Standard FLN and classroom evaluation sentences (Hindi, Santali Ol Chiki, Devanagari, and Roman)

export interface BenchmarkSentence {
  hi: string;
  en: string;
  od: string;
  sat: string;
  satRoman: string;
  mun: string;
  munRoman: string;
  ho: string;
  hoRoman: string;
}

export const BENCHMARK_CLASSROOM_SENTENCES: BenchmarkSentence[] = [
  {
    hi: 'सुप्रभात, बच्चों।',
    en: 'Good morning, children.',
    od: 'ଶୁଭ ସକାଳ, ପିଲାମାନେ।',
    sat: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ, ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱾',
    satRoman: 'Sagun setag, gidra ko.',
    mun: 'बोगे सेताः, होनको।',
    munRoman: 'Boge setah, honko.',
    ho: 'बुगि सेताः, होनको।',
    hoRoman: 'Bugi setah, honko.'
  },
  {
    hi: 'सभी बच्चे अपनी जगह पर बैठ जाएँ।',
    en: 'All children sit down in your places.',
    od: 'ସବୁ ପିଲା ନିଜ ନିଜ ସ୍ଥାନରେ ବସ।',
    sat: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ ᱾',
    satRoman: 'Sanam gidra apnar thaw re durub pe.',
    mun: 'सब होनको आपन ठांव रे दुबुड़ेपे।',
    munRoman: 'Sab honko aapan thanw re dubudepe.',
    ho: 'सोबेन होनको आपन ठांव रे दुबुड़ेपे।',
    hoRoman: 'Soben honko aapan thanw re dubudepe.'
  },
  {
    hi: 'अपनी किताब खोलो।',
    en: 'Open your book.',
    od: 'ତୁମ ବହି ଖୋଲ।',
    sat: 'ᱟᱢᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ ᱾',
    satRoman: 'Amag puthi jhij me.',
    mun: 'आपन पुथी उघड़इपे।',
    munRoman: 'Aapan puthi ughadaeipe.',
    ho: 'आपन पुथी उघड़इपे।',
    hoRoman: 'Aapan puthi ughadaeipe.'
  },
  {
    hi: 'अपनी कॉपी निकालो।',
    en: 'Take out your notebook.',
    od: 'ତୁମ ଖାତା ବାହାର କର।',
    sat: 'ᱟᱢᱟᱜ ᱠᱷᱟᱛᱟ ᱚᱰᱚᱠ ᱢᱮ ᱾',
    satRoman: 'Amag khata odok me.',
    mun: 'आपन कापी ओड़ोङ्गेपे।',
    munRoman: 'Aapan kapi odonggepe.',
    ho: 'आपन कापी ओड़ोङ्गेपे।',
    hoRoman: 'Aapan kapi odonggepe.'
  },
  {
    hi: 'ध्यान से सुनो।',
    en: 'Listen carefully.',
    od: 'ମନ ଦେଇ ଶୁଣ।',
    sat: 'ᱱᱟᱯᱟᱭ ᱛᱮ ᱟᱸᱡᱚᱢ ᱯᱮ ᱾',
    satRoman: 'Napay te anjom pe.',
    mun: 'बेस ते आजुमपे।',
    munRoman: 'Bes te aajumpe.',
    ho: 'बेस ते आजुमपे।',
    hoRoman: 'Bes te aajumpe.'
  },
  {
    hi: 'मेरी बात दोहराओ।',
    en: 'Repeat after me.',
    od: 'ମୋ କଥା ଦୋହରାଅ।',
    sat: 'ᱤᱧᱟᱜ ᱠᱟᱛᱷᱟ ᱫᱚᱦᱲᱟᱭ ᱯᱮ ᱾',
    satRoman: 'Inyag katha dohday pe.',
    mun: 'आईंयाः काजी दोहड़ाएपे।',
    munRoman: 'Aainyah kaaji dohdaeipe.',
    ho: 'आईंयाः काजी दोहड़ाएपे।',
    hoRoman: 'Aainyah kaaji dohdaeipe.'
  },
  {
    hi: 'आज हम एक नया पाठ पढ़ेंगे।',
    en: 'Today we will read a new lesson.',
    od: 'ଆଜି ଆମେ ଏକ ନୂଆ ପାଠ ପଢ଼ିବା।',
    sat: 'ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱢᱤᱫ ᱱᱟᱣᱟ ᱯᱟᱴᱷ ᱵᱚ ᱯᱟᱲᱦᱟᱣᱟ ᱾',
    satRoman: 'Tehenj do abo mid nawa path bo padhawa.',
    mun: 'तिसिंग आबु मियाद नावा पाठ बु पढ़ावा।',
    munRoman: 'Tising aabu miyad nawa path bu padhawa.',
    ho: 'तिसिंग आबु मियाद नावा पाठ बु पढ़ावा।',
    hoRoman: 'Tising aabu miyad nawa path bu padhawa.'
  },
  {
    hi: 'क्या सबको समझ में आया?',
    en: 'Did everyone understand?',
    od: 'ସମସ୍ତେ ବୁଝିପାରିଲ କି?',
    sat: 'ᱪᱮᱫ ᱥᱟᱱᱟᱢ ᱠᱚ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫ-ᱟ?',
    satRoman: 'Ched sanam ko bujhaw ked-a?',
    mun: 'चि सबुके बुझाव जाना?',
    munRoman: 'Chi sabuke bujhaw jaana?',
    ho: 'चि सोबेनकोके बुझाव जाना?',
    hoRoman: 'Chi sobenkoke bujhaw jaana?'
  },
  {
    hi: 'अगर कोई सवाल है तो पूछो।',
    en: 'If there are any questions, ask.',
    od: 'ଯଦି କିଛି ପ୍ରଶ୍ନ ଅଛି ତେବେ ପଚାର।',
    sat: 'ᱡᱩᱫᱤ ᱡᱟᱦᱟᱸᱱ ᱠᱩᱠᱞᱤ ᱢᱮᱱᱟᱜ-ᱟ ᱮᱱᱠᱷᱟᱱ ᱠᱩᱞᱤᱭ ᱯᱮ ᱾',
    satRoman: 'Judi jahan kukli menag-a enkhan kuliy pe.',
    mun: 'जुदी जेटना कुली मेनाःरे कुलीपे।',
    munRoman: 'Judi jetna kuli menahre kulipe.',
    ho: 'जुदी जेटना कुली मेनाःरे कुलीपे।',
    hoRoman: 'Judi jetna kuli menahre kulipe.'
  },
  {
    hi: 'बोर्ड की तरफ देखो।',
    en: 'Look at the board.',
    od: 'ବୋର୍ଡ଼ ଆଡ଼କୁ ଦେଖ।',
    sat: 'ᱵᱚᱨᱰ ᱥᱮᱫ ᱠᱚᱭᱚᱜ ᱯᱮ ᱾',
    satRoman: 'Bord sed koyog pe.',
    mun: 'बोर्ड साः नेलपे।',
    munRoman: 'Board sah nelpe.',
    ho: 'बोर्ड साः नेलपे।',
    hoRoman: 'Board sah nelpe.'
  },
  {
    hi: 'इसे अपनी कॉपी में लिखो।',
    en: 'Write this in your notebook.',
    od: 'ଏହାକୁ ତୁମ ଖାତାରେ ଲେଖ।',
    sat: 'ᱱᱚᱣᱟ ᱟᱢᱟᱜ ᱠᱷᱟᱛᱟ ᱨᱮ ᱚᱞ ᱢᱮ ᱾',
    satRoman: 'Nowa amag khata re ol me.',
    mun: 'नेआ आपन कापी रे ओलपे।',
    munRoman: 'Nea aapan kapi re oolpe.',
    ho: 'नेआ आपन कापी रे ओलपे।',
    hoRoman: 'Nea aapan kapi re oolpe.'
  },
  {
    hi: 'अपना हाथ ऊपर करो।',
    en: 'Raise your hand.',
    od: 'ନିଜ ହାତ ଉପରକୁ କର।',
    sat: 'ᱟᱯᱱᱟᱨ ᱛᱤ ᱪᱮᱛᱟᱱ ᱨᱟᱠᱟᱵ ᱯᱮ ᱾',
    satRoman: 'Apnar ti chetan rakab pe.',
    mun: 'आपन ती चेतान राकाबपे।',
    munRoman: 'Aapan ti chetan rakabpe.',
    ho: 'आपन ती चेतान राकाबपे।',
    hoRoman: 'Aapan ti chetan rakabpe.'
  },
  {
    hi: 'एक-एक करके जवाब दो।',
    en: 'Answer one by one.',
    od: 'ଜଣ ଜଣ କରି ଉତ୍ତର ଦିଅ।',
    sat: 'ᱢᱤᱫ-ᱢᱤᱫ ᱛᱮ ᱛᱮᱞᱟ ᱮᱢ ᱯᱮ ᱾',
    satRoman: 'Mid-mid te tela em pe.',
    mun: 'मियाद-मियाद ते जवाब एमपे।',
    munRoman: 'Miyad-miyad te jawab empe.',
    ho: 'मियाद-मियाद ते जवाब एमपे।',
    hoRoman: 'Miyad-miyad te jawab empe.'
  },
  {
    hi: 'अपने साथी के साथ मिलकर काम करो।',
    en: 'Work together with your partner.',
    od: 'ନିଜ ସାଙ୍ଗ ସହିତ ମିଶି କାମ କର।',
    sat: 'ᱟᱯᱱᱟᱨ ᱜᱟᱛᱮ ᱥᱟᱶ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱠᱟᱹᱢᱤ ᱯᱮ ᱾',
    satRoman: 'Apnar gate sawn mesa kate kami pe.',
    mun: 'आपन गाते लोः मेशाकेते कामीपे।',
    munRoman: 'Aapan gate loh meshakete kamipe.',
    ho: 'आपन गाते लोः मेशाकेते कामीपे।',
    hoRoman: 'Aapan gate loh meshakete kamipe.'
  },
  {
    hi: 'चुपचाप काम पूरा करो।',
    en: 'Complete the work quietly.',
    od: 'ଚୁପଚାପ କାମ ସାର।',
    sat: 'ᱛᱷᱤᱨ ᱠᱟᱛᱮ ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣ ᱯᱮ ᱾',
    satRoman: 'Thir kate kami puraw pe.',
    mun: 'थिरकेते कामी पूराएपे।',
    munRoman: 'Thirkete kami puraeipe.',
    ho: 'थिरकेते कामी पूराएपे।',
    hoRoman: 'Thirkete kami puraeipe.'
  },
  {
    hi: 'अपना काम मुझे दिखाओ।',
    en: 'Show me your work.',
    od: 'ତୁମ କାମ ମୋତେ ଦେଖାଅ।',
    sat: 'ᱟᱢᱟᱜ ᱠᱟᱹᱢᱤ ᱤᱧ ᱩᱫᱩᱜ-ᱟᱹᱧ ᱢᱮ ᱾',
    satRoman: 'Amag kami inj udug-any me.',
    mun: 'आपन कामी आईंके उदुइपे।',
    munRoman: 'Aapan kami aainke uduipe.',
    ho: 'आपन कामी आईंके उदुइपे।',
    hoRoman: 'Aapan kami aainke uduipe.'
  },
  {
    hi: 'क्या तुम्हारा काम पूरा हो गया?',
    en: 'Is your work finished?',
    od: 'ତୁମ କାମ ସରିଗଲା କି?',
    sat: 'ᱪᱮᱫ ᱟᱢᱟᱜ ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ?',
    satRoman: 'Ched amag kami puraw ena?',
    mun: 'चि आमाः कामी पूराव जाना?',
    munRoman: 'Chi aamah kami puraw jaana?',
    ho: 'चि आमाः कामी पूराव जाना?',
    hoRoman: 'Chi aamah kami puraw jaana?'
  },
  {
    hi: 'आज का पाठ यहीं समाप्त करते हैं।',
    en: "We finish today's lesson here.",
    od: 'ଆଜିର ପାଠ ଏଇଠି ସାରିବା।',
    sat: 'ᱛᱮᱦᱮᱧᱟᱜ ᱯᱟᱴᱷ ᱫᱚ ᱱᱚᱰᱮ ᱜᱮ ᱵᱚ ᱢᱩᱪᱟᱹᱫ ᱮᱫ-ᱟ ᱾',
    satRoman: 'Tehenjag path do node ge bo muchad ed-a.',
    mun: 'तिसिंगाः पाठ नेपागेबु मुचावेया।',
    munRoman: 'Tisingah path nepagebu muchawaya.',
    ho: 'तिसिंगाः पाठ नेपागेबु मुचावेया।',
    hoRoman: 'Tisingah path nepagebu muchawaya.'
  },
  {
    hi: 'अपनी किताब और कॉपी रख दो।',
    en: 'Put away your books and notebooks.',
    od: 'ତୁମ ବହି ଓ ଖାତା ରଖିଦିଅ।',
    sat: 'ᱟᱯᱱᱟᱨ ᱯᱩᱛᱷᱤ ᱟᱨ ᱠᱷᱟᱛᱟ ᱫᱚᱦᱚᱭ ᱯᱮ ᱾',
    satRoman: 'Apnar puthi aar khata dohoy pe.',
    mun: 'आपन पुथी ओड़ोः कापी दोहोएपे।',
    munRoman: 'Aapan puthi odoh kapi dohoepe.',
    ho: 'आपन पुथी ओड़ोः कापी दोहोएपे।',
    hoRoman: 'Aapan puthi odoh kapi dohoepe.'
  },
  {
    hi: 'कल फिर मिलेंगे।',
    en: 'We will meet again tomorrow.',
    od: 'ଆସନ୍ତାକାଲି ପୁଣି ଦେଖାହେବା।',
    sat: 'ᱜᱟᱯᱟ ᱟᱨᱦᱚᱸ ᱵᱚ ᱧᱟᱯᱟᱢᱟ ᱾',
    satRoman: 'Gapa arho bo nyapama.',
    mun: 'गापा ओड़ोःबु नेपेला।',
    munRoman: 'Gapa odohbu nepela.',
    ho: 'गापा ओड़ोःबु नेपेला।',
    hoRoman: 'Gapa odohbu nepela.'
  }
];
