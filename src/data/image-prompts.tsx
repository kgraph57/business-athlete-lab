/**
 * ============================================================
 * Business Athlete Lab — nanoban 画像生成指示書
 * ============================================================
 *
 * ## このファイルの使い方
 *
 * 1. 各エントリの `prompt` をnanobanにコピペして生成
 * 2. `placement` で示された場所に配置
 * 3. `composition` の指示に従ってトリミング・テキスト配置
 *
 * ## スタイル方針（全画像共通）
 *
 * 撮影スタイル: 高級ウェルネスリゾートの広告写真風
 * 参照: Aman Tokyo のパンフレット / NOT A HOTEL の物件写真
 * トーン: ウォーム・ニュートラル（彩度低め）
 * 光: 自然光（朝〜ゴールデンアワー）、窓からの間接光
 * 人物: 顔を映さない。手元・後ろ姿・シルエットのみOK
 * 共通パラメータ: --style raw --s 200 --q 2
 *
 * ## カラーパレット
 *
 * ベース: cream #FAF8F4 / sand #D4CCC0 / stone #A09890
 * 運動: sage #8B9E8B / 睡眠: indigo #7B8BA6 / 栄養: terracotta #C4907A
 * メンタル: lavender #9B8EB0 / 生活: moss #7A9488 / 長寿: amber #C4A265
 *
 * ## ファイル命名・最適化
 *
 * WebP形式 / 品質80
 * hero-main.webp (< 200KB) / topic-{id}.webp (< 100KB)
 * thumb-{id}-{n}.webp (< 60KB) / og-{name}.webp (< 150KB)
 */

import type { Topic } from "@/types";

interface ImageSpec {
  readonly width: number;
  readonly height: number;
  readonly aspectRatio: string;
}

interface PromptEntry {
  readonly id: string;
  /** どこに配置するか・何の目的か */
  readonly placement: string;
  /** 被写体の具体的な説明（日本語） */
  readonly subject: string;
  /** 構図・テキスト配置の注意点 */
  readonly composition: string;
  /** nanobanにコピペするプロンプト */
  readonly prompt: string;
  readonly spec: ImageSpec;
}

interface TopicPromptSet {
  readonly hero: PromptEntry;
  readonly thumbnails: readonly PromptEntry[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. HERO（トップページ最上部 — テキストの背景）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HERO: PromptEntry = {
  id: "hero-main",
  placement:
    "トップページ Hero セクション（min-h-[80vh]）。タイトル「予防医療を、自分の身体で証明する。」が左下に乗る。",
  subject:
    "Aman風の高級プライベートジムで、早朝にバーベルスナッチをキャッチした瞬間の後ろ姿。無垢材の床、コンクリート壁、天井高5mの開放的な空間。窓の外は朝靄の山並み。「身体を鍛えることが教養である」という世界観。",
  composition:
    "人物は右1/3にシルエット気味に。左2/3は空間と光（テキスト配置用）。天井の高さが画面上部のネガティブスペースを作る。",
  prompt:
    "Back view of athletic man in black shorts catching barbell overhead snatch in a luxurious private gym with 5-meter high ceilings, raw concrete walls and warm oak hardwood floor, floor-to-ceiling windows showing misty mountain landscape at dawn, figure in right third of frame as semi-silhouette against window light, left two-thirds is open space with volumetric morning light rays for text overlay, minimal equipment visible, single Olympic platform, Aman resort aesthetic meets functional fitness, warm cream and sand tones, architectural fitness photography --ar 16:9 --style raw --s 200 --q 2",
  spec: { width: 1920, height: 1080, aspectRatio: "16:9" },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. TOPIC HEROES（各トピックページの最上部）
//    + TOPIC THUMBNAILS（記事カード画像 3:2）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TOPICS_PROMPTS: Record<Topic, TopicPromptSet> = {
  // ──── EXERCISE（運動）────
  exercise: {
    hero: {
      id: "topic-exercise",
      placement:
        "/topics/exercise/ ヒーロー（min-h-[50vh]）。左下にタイトル「運動」が乗る。",
      subject:
        "NOT A HOTEL風のプライベートアウトドアトレーニングデッキ。朝靄の森を背景に、吊りリングとケトルベルが置かれた木製デッキ。裸足で立つ男性の足元とふくらはぎだけが見える。",
      composition:
        "デッキを手前から奥に。森が背景にぼける。人物の足元は右下に。左側にテキストスペース。",
      prompt:
        "Private outdoor training deck at luxury forest retreat at dawn, wooden deck with gymnastic rings hanging from timber beam, single kettlebell on deck surface, bare feet and calves of athletic man visible at right edge of frame, misty forest of tall cedars in background, morning golden light filtering through trees, left side has misty negative space for text, NOT A HOTEL inspired architecture, warm sage green forest and cream wood tones, editorial wellness fitness photography --ar 2:1 --style raw --s 200 --q 2",
      spec: { width: 1200, height: 600, aspectRatio: "2:1" },
    },
    thumbnails: [
      {
        id: "thumb-exercise-01",
        placement:
          "運動カテゴリの記事カード画像。HIIT・高強度トレーニング系記事に使用。",
        subject:
          "コンセプトローイングマシン（C2ローイング）のモニター画面のクローズアップ。画面にスプリットタイム「1:45.0」が表示されている。奥にぼけたハンドルとチェーン。",
        composition:
          "モニター画面を画面中央やや左に。右側と上部に余白。浅い被写界深度で背景をぼかす。",
        prompt:
          "Close-up of Concept2 rowing machine PM5 monitor displaying split time 1:45.0 and meters rowed, chain and handle blurred in background, shallow depth of field, warm overhead gym lighting, rubber mat floor visible, muted sage green and warm gray tones, technical sports equipment photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-exercise-02",
        placement:
          "運動カテゴリの記事カード画像。筋トレ・プロテイン・筋肥大系記事に使用。",
        subject:
          "チョークまみれの手のクローズアップ。バーベルのナーリング（ギザギザ）を握っている瞬間。手首にはトレーニングリストラップ。",
        composition:
          "手とバーベルを画面中央〜下に。上部に暗いネガティブスペース。マクロ寄りで質感を強調。",
        prompt:
          "Extreme close-up of chalked hands gripping barbell knurling, white chalk dust on palms and fingers, black wrist wraps visible, shallow depth of field, dark gym background, warm side light highlighting chalk texture and hand tendons, muted sage and warm stone tones, macro sports photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-exercise-03",
        placement:
          "運動カテゴリの記事カード画像。有酸素・ランニング・トライアスロン系記事に使用。",
        subject:
          "トライアスロン用ロードバイクが壁に立てかけてある。横にランニングシューズとウェットスーツが整然と並ぶ。レース前の準備風景。",
        composition:
          "バイクを左に、シューズ等を右下に。窓からの自然光。全体的に整理された静物画的構図。",
        prompt:
          "Triathlon race preparation flat lay: carbon road bike leaning against concrete wall, running shoes and wetsuit neatly arranged on floor beside it, race number bib pinned to tri-suit, morning window light from right side, clean concrete floor, organized and intentional arrangement, muted sage green bike frame accent, warm neutral tones, overhead editorial photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
    ],
  },

  // ──── SLEEP（睡眠）────
  sleep: {
    hero: {
      id: "topic-sleep",
      placement: "/topics/sleep/ ヒーロー。左下にタイトル「睡眠」。",
      subject:
        "Aman Tokyo風スイートルームのベッドルーム。低いプラットフォームベッドにリネンのシーツ。窓から東京の夜景がぼんやり見えるが、遮光カーテンで暗い。ベッドサイドにOura Ringだけが小さな光を放っている。完璧な睡眠環境。",
      composition:
        "ベッドを画面右に。窓の都市夜景を左奥に薄暗く。全体的に暗いトーン（睡眠の雰囲気）だがOura Ringの小さな光がアクセント。テキストは左下。",
      prompt:
        "Aman Tokyo inspired luxury suite bedroom in near-darkness, low platform bed with rumpled natural linen sheets, faint city skyline visible through large window with blackout curtains partially drawn, only light sources are small green LED glow of Oura Ring on wooden bedside table and faint blue urban glow from window, deep shadows, feeling of perfect sleep environment, dusty indigo blue and deep warm charcoal tones, intimate architectural interior photography --ar 2:1 --style raw --s 200 --q 2",
      spec: { width: 1200, height: 600, aspectRatio: "2:1" },
    },
    thumbnails: [
      {
        id: "thumb-sleep-01",
        placement:
          "睡眠カテゴリ記事カード。概日リズム・体内時計・光と睡眠の関係の記事。",
        subject:
          "朝日が差し込む窓際に置かれた光目覚まし時計（Philips Wake-up Light風）。時刻は6:30。窓の外は朝焼け。",
        composition:
          "光目覚ましを左1/3に配置。窓からの朝の光がグラデーションで画面を横切る。右側に余白。",
        prompt:
          "Sunrise alarm clock on wooden bedside table showing 6:30 AM, warm orange light emanating from device simulating sunrise, real sunrise visible through window in background, gradient from warm orange glow on left to cool blue morning light on right, linen bed edge visible in foreground, shallow depth of field, warm ivory and dusty indigo blue tones, product-in-context photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-sleep-02",
        placement:
          "睡眠カテゴリ記事カード。睡眠時間・7時間睡眠・睡眠と認知機能の記事。",
        subject:
          "Oura Ring（チタングレー）が木製トレイの上に置いてある。横にコップ一杯の水とメラトニンのサプリボトル（ラベルは読めない程度にぼかす）。",
        composition:
          "リングを中央に。浅い被写界深度でサプリボトルはぼかす。暖色のベッドサイドランプの光。",
        prompt:
          "Oura Ring in titanium gray resting on small wooden tray on bedside table, glass of water beside it, supplement bottle with blurred label in soft background, warm bedside lamp glow from right, dark bedroom background, shallow depth of field focusing on ring, warm ivory and dusty indigo blue tones, intimate product photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-sleep-03",
        placement: "睡眠カテゴリ記事カード。睡眠環境・温度・寝具の最適化記事。",
        subject:
          "ベッドルームの温度計が18.5℃を示している。背景にリネンのベッドと暗い寝室。エアコンのリモコンがベッドサイドに。",
        composition:
          "温度計を手前にクローズアップ。背景のベッドは大きくぼけて雰囲気を伝える程度。",
        prompt:
          "Digital room thermometer displaying 18.5 degrees Celsius on bedside table, dark minimalist bedroom in background with linen bed completely out of focus, small green LED indicator light, warm wood table surface, cool indigo blue ambient tones suggesting nighttime, shallow depth of field, technical-meets-lifestyle photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
    ],
  },

  // ──── NUTRITION（栄養）────
  nutrition: {
    hero: {
      id: "topic-nutrition",
      placement: "/topics/nutrition/ ヒーロー。左下にタイトル「栄養」。",
      subject:
        "キッチンカウンターに並ぶ高タンパク食材のフラットレイ。鶏むね肉、卵6個、ギリシャヨーグルト、アボカド、ブロッコリー、プロテインパウダーのスクープ。キッチンスケールに鶏肉が乗っている。",
      composition:
        "俯瞰（真上から）。食材を右2/3に配置。左1/3は大理石カウンターの余白（テキストスペース）。",
      prompt:
        "Overhead flat lay of high-protein meal prep ingredients on white marble kitchen counter: chicken breast on digital kitchen scale showing 165g, six eggs in cardboard holder, container of Greek yogurt, halved avocado, steamed broccoli florets in ceramic bowl, protein powder scoop with whey powder, all arranged in right two-thirds of frame, left third is clean marble surface for text space, warm natural window light from top, muted terracotta ceramic bowl, editorial food photography --ar 2:1 --style raw --s 200 --q 2",
      spec: { width: 1200, height: 600, aspectRatio: "2:1" },
    },
    thumbnails: [
      {
        id: "thumb-nutrition-01",
        placement:
          "栄養カテゴリ記事カード。プロテイン・タンパク質摂取量・筋合成系記事。",
        subject:
          "プロテインシェイカーとキッチンスケール。スケールの上にプロテインパウダー30gが計量されている。横にプロテインのパッケージ（ラベルぼかし）。",
        composition:
          "スケールを中央に、シェイカーを右奥にぼかして配置。数字「30g」が読める程度のクローズアップ。",
        prompt:
          "Kitchen scale displaying 30 grams with scoop of whey protein powder on it, protein shaker bottle with blurred label in right background, clean white marble counter, warm morning kitchen light from window, shallow depth of field, warm terracotta and cream tones, precise measurement concept, lifestyle product photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-nutrition-02",
        placement:
          "栄養カテゴリ記事カード。腸内環境・マイクロバイオーム・発酵食品系記事。",
        subject:
          "和食の発酵食品が陶器の小皿に並ぶ。味噌、納豆、ぬか漬け、キムチ、甘酒。木の箸が添えてある。",
        composition:
          "小皿5枚を緩やかなS字カーブで配置。テーブルは無垢のオーク材。自然光で食材の質感を強調。",
        prompt:
          "Five small handmade ceramic dishes arranged in gentle S-curve on raw oak table, each containing a different fermented food: miso paste, natto with chopstick marks, nukazuke pickles, kimchi, and amazake, wooden chopsticks laid across one dish, warm natural side light emphasizing texture of each food, muted terracotta and cream ceramic tones, Japanese food editorial photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-nutrition-03",
        placement:
          "栄養カテゴリ記事カード。サプリメント・ビタミンD・マグネシウム系記事。",
        subject:
          "白い天板の上に並ぶサプリメントのカプセル。ビタミンD、マグネシウム、オメガ3のカプセルがそれぞれ小さなガラス皿に分けて入っている。ラベルなし。",
        composition:
          "3つのガラス皿を横一列に。真上からの俯瞰。各カプセルの色の違い（黄色、白、琥珀色）がアクセント。",
        prompt:
          "Three small clear glass dishes in a row on white surface, each containing different supplement capsules: yellow vitamin D softgels in left dish, white magnesium tablets in center dish, amber omega-3 fish oil capsules in right dish, overhead flat lay, clean clinical aesthetic with warm natural light, no labels or branding visible, muted terracotta accent in background, precise medical-meets-lifestyle photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
    ],
  },

  // ──── MENTAL（メンタル）────
  mental: {
    hero: {
      id: "topic-mental",
      placement: "/topics/mental/ ヒーロー。左下にタイトル「メンタル」。",
      subject:
        "Aman風の瞑想パビリオン。水盤（インフィニティプール的な浅い水面）の前で座禅を組む男性の後ろ姿。朝霧の中、水面に空が映り込んでいる。Apple Watchを横に外して置いている。",
      composition:
        "人物を中央奥に小さく。手前の水盤が画面下半分。水面の反射で上下対称に近い構図。左下にテキストスペース。",
      prompt:
        "Man sitting in zazen meditation posture seen from behind at edge of shallow reflecting pool in Aman-style open-air pavilion, morning mist over water surface reflecting lavender dawn sky, figure small in center background, Apple Watch placed on stone ledge beside him, vast reflective water surface in foreground creating mirror effect, minimal concrete and timber pavilion structure, left lower area darker for text overlay, dusty lavender and warm cream tones, contemplative architectural wellness photography --ar 2:1 --style raw --s 200 --q 2",
      spec: { width: 1200, height: 600, aspectRatio: "2:1" },
    },
    thumbnails: [
      {
        id: "thumb-mental-01",
        placement:
          "メンタルカテゴリ記事カード。ストレス管理・コルチゾール・HRV系記事。",
        subject:
          "Apple WatchのHRV（心拍変動）画面のクローズアップ。手首に装着された状態。背景はデスクワーク環境がぼけて見える。",
        composition:
          "手首のApple Watch画面を中央に大きく。HRVの数値やグラフが見える。浅い被写界深度。",
        prompt:
          "Close-up of Apple Watch on wrist showing heart rate variability HRV reading with green waveform graph on screen, blurred office desk environment in background, natural window light, wrist resting on oak desk surface, shallow depth of field focusing on watch face, warm neutral tones with subtle lavender accent, tech-wellness crossover photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-mental-02",
        placement:
          "メンタルカテゴリ記事カード。集中力・認知機能・脳パフォーマンス系記事。",
        subject:
          "集中して論文を読んでいる手元のクローズアップ。蛍光ペンでハイライトされた医学論文のページ。横にエスプレッソのデミタスカップ。",
        composition:
          "論文ページを画面下半分に。ハイライトの黄色がアクセントカラー。エスプレッソカップは右上にぼかして配置。",
        prompt:
          "Hands holding printed medical research paper with highlighted passages in yellow marker, PubMed-style academic text visible but not readable, small espresso demitasse cup on saucer in upper right background out of focus, warm desk lamp light from left, oak desk surface, intimate overhead angle, warm lavender and cream tones, academic lifestyle photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-mental-03",
        placement:
          "メンタルカテゴリ記事カード。瞑想・マインドフルネス・呼吸法系記事。",
        subject:
          "畳の上に置かれた瞑想クッション（座禅用の座蒲）。横にタイマーアプリが表示されたスマホ（10:00分タイマー）。朝の光が差し込む和室。",
        composition:
          "座蒲を中央に。スマホは左手前にぼかし気味に。障子を通した柔らかい朝の光。",
        prompt:
          "Round zafu meditation cushion in dark gray on tatami mat floor, smartphone lying beside it showing meditation timer app at 10:00 minutes, soft diffused morning light filtering through shoji screen from right, minimal Japanese room with clean lines, shallow depth of field focusing on cushion texture, warm ivory and dusty lavender tones, zen lifestyle photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
    ],
  },

  // ──── LIFESTYLE（生活習慣）────
  lifestyle: {
    hero: {
      id: "topic-lifestyle",
      placement: "/topics/lifestyle/ ヒーロー。左下にタイトル「生活習慣」。",
      subject:
        "NOT A HOTEL的なラグジュアリーヴィラの早朝。開放的なリビング・ダイニングにコーヒーセット、バレットジャーナル、サプリメントケースが並ぶ。窓の外にインフィニティプールと海が見える。5:30AMの空気感。",
      composition:
        "カウンター/テーブルを手前に。奥のプール＆海は大きくぼかして朝焼けのグラデーション。テキストは左下。",
      prompt:
        "Early morning 5:30 AM scene in NOT A HOTEL style luxury villa: kitchen island with pour-over coffee dripper mid-brew, open bullet journal, weekly supplement organizer, background shows infinity pool edge merging with ocean horizon in pre-dawn blue-to-orange gradient, floor-to-ceiling sliding glass doors open, warm interior lamp contrasting with cool dawn light outside, polished concrete floor, warm moss green and cream tones, aspirational lifestyle editorial photography --ar 2:1 --style raw --s 200 --q 2",
      spec: { width: 1200, height: 600, aspectRatio: "2:1" },
    },
    thumbnails: [
      {
        id: "thumb-lifestyle-01",
        placement:
          "生活習慣カテゴリ記事カード。習慣化・ルーティン・行動変容系記事。",
        subject:
          "手帳（バレットジャーナル）の見開き。ハビットトラッカーのページが開いている。チェックマークが入った項目（運動、瞑想、読書等）。横にペン。",
        composition:
          "手帳を正面やや斜めから。チェックマークの列が見える。ペンを右に添えて。温かみのある木製デスク。",
        prompt:
          "Open bullet journal showing habit tracker spread with neat grid, checkmarks filled in for items like exercise meditation reading and supplements, fine-tip black pen beside notebook, warm oak desk surface, soft morning window light from left, overhead angle slightly tilted, warm cream paper and moss green ink accents, organized productivity aesthetic --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-lifestyle-02",
        placement:
          "生活習慣カテゴリ記事カード。サウナ・冷水浴・温熱療法系記事。",
        subject:
          "フィンランド式サウナの内部。白樺のヴィヒタ（枝束）がベンチに置いてある。サウナストーンに水をかけた直後の蒸気。温度計が90℃を示している。",
        composition:
          "サウナ内部を斜めから。蒸気がバックライトで光る。温度計を右上に入れて温度が分かるように。",
        prompt:
          "Interior of Finnish sauna with cedar wood benches, birch vihta bundle resting on lower bench, steam rising from hot sauna stones after water pour, wooden thermometer on wall showing 90 degrees Celsius, warm amber backlighting through steam, shallow depth of field, warm honey amber and moss green tones from birch leaves, atmospheric sauna photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-lifestyle-03",
        placement: "生活習慣カテゴリ記事カード。飲酒・減酒・肝臓系記事。",
        subject:
          "バーカウンターにノンアルコールクラフトビールのグラスが1杯。横にボトル（ラベルぼかし）。カウンターは無垢材。背景に本棚。落ち着いた大人のバー空間。",
        composition:
          "グラスを中央左に。ボトルを右にぼかして。バーの間接照明で琥珀色のビールが光る。",
        prompt:
          "Single glass of non-alcoholic craft beer with golden amber color and thin foam head on raw wood bar counter, blurred bottle beside it, background shows bookshelf and warm bar interior with indirect lighting, beer glass catching warm light and glowing amber, sophisticated adult bar atmosphere, warm moss and amber tones, lifestyle beverage photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
    ],
  },

  // ──── AGING（長寿）────
  aging: {
    hero: {
      id: "topic-aging",
      placement: "/topics/aging/ ヒーロー。左下にタイトル「長寿」。",
      subject:
        "Aman風リゾートの海沿いランニングパスを走る男性のシルエット（遠景）。朝日が水平線から昇る。石造りの小道、両脇にオリーブの木。「100年動ける身体」を目指す世界観。",
      composition:
        "人物は中央〜右の遠景に小さく。海と朝日が画面の大部分。左下にテキストスペース。黄金色の光。",
      prompt:
        "Distant silhouette of athletic man running on stone path along Mediterranean coastline at golden sunrise, path flanked by olive trees, Aman resort style stone walls and landscaping, vast golden ocean and sunrise filling most of frame, figure small in right third, left side has warm golden gradient for text overlay, long morning shadows, sense of timeless vitality and longevity, warm amber and honey tones, cinematic resort lifestyle photography --ar 2:1 --style raw --s 200 --q 2",
      spec: { width: 1200, height: 600, aspectRatio: "2:1" },
    },
    thumbnails: [
      {
        id: "thumb-aging-01",
        placement:
          "長寿カテゴリ記事カード。テロメア・生物学的年齢・エイジングバイオマーカー系記事。",
        subject:
          "血液検査の採血管（紫キャップのEDTA管）が試験管立てに並んでいる。横にラボの検査結果用紙（数値がぼやけて見える）。医療的だが温かみのある光。",
        composition:
          "採血管を中央に3本並べて。検査結果用紙を左手前にぼかして。背景はクリーンな白。",
        prompt:
          "Three purple-capped EDTA blood collection tubes in wooden test tube rack, lab results paper with blurred numbers in left foreground, clean clinical white surface, warm natural window light giving medical equipment a warm approachable look, shallow depth of field on tubes, warm amber and cream tones softening the clinical feel, medical lifestyle photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-aging-02",
        placement:
          "長寿カテゴリ記事カード。VO2max・有酸素能力・身体能力測定系記事。",
        subject:
          "Garminのスポーツウォッチの画面にVO2maxスコア「52」が表示されている。手首に装着された状態。背景にランニングトラック。",
        composition:
          "手首のGarmin画面を中央やや左にクローズアップ。VO2maxの数字が読める。背景のトラックはぼかす。",
        prompt:
          "Close-up of Garmin sports watch on wrist displaying VO2 Max score of 52 with green status indicator, blurred outdoor running track in warm morning light background, athletic wrist and forearm visible, shallow depth of field on watch face, warm amber morning light, tech-meets-athletics photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-aging-03",
        placement:
          "長寿カテゴリ記事カード。長寿食・地中海食・ブルーゾーン系記事。",
        subject:
          "地中海食のワンプレート。エクストラバージンオリーブオイルをかけたサラダ、グリルした魚、全粒パン、赤ワイン1杯（少量）。テラスの屋外テーブル。",
        composition:
          "テーブルを斜め上から。プレートを中央に。赤ワインのグラスは右奥に小さく。地中海の光。",
        prompt:
          "Mediterranean diet meal on rustic ceramic plate: grilled fish fillet, mixed green salad drizzled with extra virgin olive oil, slice of whole grain bread, small glass of red wine in background, outdoor terrace table with warm golden Mediterranean sunlight, olive tree shadow on white tablecloth, warm amber and terracotta tones, editorial food photography evoking Blue Zone longevity lifestyle --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
    ],
  },

  // ──── INTEGRATIVE（総合）────
  integrative: {
    hero: {
      id: "topic-integrative",
      placement: "/topics/integrative/ ヒーロー。左下にタイトル「総合」。",
      subject:
        "Aman風ライブラリのデスク。MacBook（PubMed画面）、トレーニンググローブ、チョークバッグ、プロテインシェイカー、医学論文の束が共存。背景に重厚な書棚。窓から庭が見える。「知性×身体性」を1カットで。",
      composition:
        "デスクを斜め上から。MacBook、グローブ、論文が三角形を作る配置。左側にテキストスペース。書棚が背景の重厚感を出す。",
      prompt:
        "Business athlete desk in Aman-style private library from above: MacBook showing PubMed search results, CrossFit training gloves and chalk bag beside ceramic pour-over coffee, stack of medical journals with colored tabs, protein shaker bottle, oak desk with warm morning light from garden-view window, dark wood bookshelves in background, items in triangular composition in right two-thirds, left third clean desk for text, warm stone and cream tones, editorial lifestyle photography --ar 2:1 --style raw --s 200 --q 2",
      spec: { width: 1200, height: 600, aspectRatio: "2:1" },
    },
    thumbnails: [
      {
        id: "thumb-integrative-01",
        placement:
          "総合カテゴリ記事カード。エビデンス解説・論文レビュー・メタ分析系記事。",
        subject:
          "積み重なった医学論文のプリントアウト。付箋が何枚も貼られている。一番上の論文にはハイライトが引かれている。横に赤ペン。",
        composition:
          "論文の束を斜めから。付箋の色（黄・ピンク・緑）がカラーアクセント。浅い被写界深度で手前の論文にフォーカス。",
        prompt:
          "Stack of printed medical research papers with multiple colored sticky note tabs protruding from edges in yellow pink and green, top paper has highlighted passages and red pen marks, red pen lying beside stack, oak desk surface, warm window light, shallow depth of field focusing on top paper, warm stone and cream tones with colorful tab accents, academic research lifestyle photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-integrative-02",
        placement:
          "総合カテゴリ記事カード。運動＋栄養の複合記事、実践ガイド系。",
        subject:
          "トレーニング後のリカバリーセットアップ。フォームローラー、プロテインシェイカー、バナナ、アイスバス用のバケツが並ぶ。ジムの片隅。",
        composition:
          "アイテムを横一列にフラットレイ風に。コンクリートの床。自然光。全体の統一感。",
        prompt:
          "Post-workout recovery setup flat lay on concrete gym floor: foam roller, protein shaker with brown shake visible through clear bottle, banana, compression boots, ice bath bucket with condensation, items arranged in neat horizontal row, overhead angle, warm natural light from gym window, muted sage and warm stone tones, functional fitness lifestyle photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
      {
        id: "thumb-integrative-03",
        placement:
          "総合カテゴリ記事カード。ウェアラブル・データドリブン健康管理系記事。",
        subject:
          "デスクに並ぶ健康トラッキングデバイス群。Apple Watch、Oura Ring、Whoop ストラップ、体組成計のアプリ画面が映ったスマホ。データで健康を管理するイメージ。",
        composition:
          "デバイスを左から右に大きさ順に並べる。スマホは右端で画面を上に。全体を俯瞰。",
        prompt:
          "Health tracking devices arranged on oak desk from left to right: Oura Ring, Apple Watch, Whoop strap, smartphone showing body composition app with graphs and metrics, all devices neatly spaced, overhead flat lay, warm morning desk lamp light, clean organized tech-health aesthetic, warm stone and cream tones with subtle screen glow accents, tech lifestyle product photography --ar 3:2 --style raw --s 200 --q 2",
        spec: { width: 800, height: 533, aspectRatio: "3:2" },
      },
    ],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. ABOUT PAGE（/about/ プロフィール画像）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ABOUT_PORTRAITS: readonly PromptEntry[] = [
  {
    id: "about-01",
    placement:
      "/about/ ページ上部。プロフィール紹介の横に配置。「ビジネスアスリートの朝」。縦位置。",
    subject:
      "Aman風の高級プライベートジムで、ローイングマシンを漕ぎ終えた男性の後ろ姿。黒いタンクトップから引き締まった肩と背中が見える。タオルを首にかけている。窓の外に朝靄の庭園。顔は映さない。",
    composition:
      "人物を中央〜下に。上部に天井の高いジム空間と窓のネガティブスペース。縦位置で迫力を出す。",
    prompt:
      "Back view of athletic man sitting on rowing machine in luxurious private gym with high ceilings, wearing black tank top showing defined shoulders and back, white towel draped around neck, looking toward floor-to-ceiling window showing misty Japanese garden, warm morning light streaming in, Aman resort style raw concrete and warm oak interior, no face visible, warm cream and sage tones, editorial fitness portrait photography --ar 3:4 --style raw --s 200 --q 2",
    spec: { width: 900, height: 1200, aspectRatio: "3:4" },
  },
  {
    id: "about-02",
    placement: "/about/ ページ中段。「トレーニング中」の一面。横長で使用。",
    subject:
      "NOT A HOTEL風のアウトドアデッキで、朝日の中バトルロープをしている男性のシルエット。ロープの波形が空中に凍結したような瞬間。背景に海と朝焼け。",
    composition:
      "人物を中央に。ロープの波形が画面を横切る。朝焼けの空が背景。シルエットで顔は見えない。",
    prompt:
      "Silhouette of athletic man doing battle ropes on outdoor wooden deck at sunrise, rope frozen mid-wave creating dramatic S-curve across frame, ocean and orange sunrise sky in background, NOT A HOTEL style minimalist architecture visible at edges, figure in center as dark silhouette against bright sky, warm amber and golden tones, powerful athletic moment, cinematic fitness photography --ar 16:9 --style raw --s 200 --q 2",
    spec: { width: 1200, height: 675, aspectRatio: "16:9" },
  },
  {
    id: "about-03",
    placement: "/about/ ページ下段。「研究・知性」の一面。論文を読む姿。",
    subject:
      "Aman風のライブラリラウンジで、革張りの椅子に座って論文を読んでいる男性の横顔シルエット。MacBookと手元のエスプレッソ。窓からの逆光。書棚に囲まれた知的空間。",
    composition:
      "人物を右に配置。窓からの逆光で顔はシルエット。左側に書棚と光の余白。",
    prompt:
      "Silhouette profile of athletic man reading research paper in Aman-style library lounge, sitting in leather armchair, MacBook on side table, espresso cup in hand, strong backlight from tall window creating dark silhouette, floor-to-ceiling bookshelves visible on left, face completely in shadow showing strong jawline profile, warm cream window glow contrasting dark interior, warm charcoal and cream tones, editorial portrait photography --ar 16:9 --style raw --s 200 --q 2",
    spec: { width: 1200, height: 675, aspectRatio: "16:9" },
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. OG IMAGE（SNSシェア時に表示される画像）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const OG_IMAGES: readonly PromptEntry[] = [
  {
    id: "og-main",
    placement:
      "トップページのOG画像。Twitter/Facebook等でシェアした時に表示。サイト名「Business Athlete Lab」とタグライン「予防医療を、自分の身体で証明する。」をFigma等で後から重ねる。",
    subject:
      "Aman風プライベートジムでバーベルを握る手元（チョーク付き）のクローズアップ。背景にぼけた高級ジム空間と朝の窓光。「ビジネスアスリート」の世界観を凝縮。",
    composition:
      "手元を左1/3に配置。右2/3はぼけたジム空間（テキスト配置用の余白）。上部40%にサイト名を入れるスペース。",
    prompt:
      "Close-up of chalked hands gripping barbell knurling in left third of frame, right two-thirds is beautifully blurred luxury private gym interior with warm morning light through tall windows providing clean space for text overlay, Aman resort aesthetic with concrete and warm oak, upper portion has soft even-toned negative space for site title, warm cream sand and sage tones, conceptual brand photography for social media card --ar 1.91:1 --style raw --s 200 --q 2",
    spec: { width: 1200, height: 630, aspectRatio: "1.91:1" },
  },
  {
    id: "og-article",
    placement:
      "記事ページのデフォルトOG画像。記事タイトルをFigma等で後から重ねる。",
    subject:
      "開いた医学論文の上にペンとハイライトマーカー。論文のテキストはぼかして読めない。上部に広い余白（テキスト配置用）。",
    composition:
      "論文を画面下1/3に。上2/3はクリームの背景余白（タイトル配置用）。",
    prompt:
      "Medical research paper pages spread open on cream-colored desk surface, occupying lower third of frame, yellow highlighter and pen on paper, text intentionally blurred and unreadable, upper two-thirds is clean warm cream desk surface with subtle shadow for text overlay area, warm natural light, academic minimal aesthetic, warm parchment and stone tones --ar 1.91:1 --style raw --s 200 --q 2",
    spec: { width: 1200, height: 630, aspectRatio: "1.91:1" },
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IMAGE_PROMPTS = {
  hero: HERO,
  topics: TOPICS_PROMPTS,
  about: ABOUT_PORTRAITS,
  og: OG_IMAGES,
} as const;

export function getTopicPrompts(topicId: Topic): TopicPromptSet {
  return TOPICS_PROMPTS[topicId];
}

export function getTopicHeroPrompt(topicId: Topic): PromptEntry {
  return TOPICS_PROMPTS[topicId].hero;
}

export function getAllThumbnailPrompts(): readonly PromptEntry[] {
  return Object.values(TOPICS_PROMPTS).flatMap((t) => t.thumbnails);
}
