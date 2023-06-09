import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req:any, res:any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    })
    return
  }

  const foods = req.body.foods || ''
  if (foods.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter valid foods",
      }
    })
    return
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(foods),
      temperature: 0.9,
      max_tokens: 1024,
    });
    const result = completion.data.choices[0].text;
    res.status(200).json({ result: JSON.parse(JSON.stringify(result)) }) //parseしないと、ダメなことが多かった。
  } catch(error:any) {

    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      })
    }
  }
}

function generatePrompt(foodList: string) {
  return `Suggest three examples of dishes from these foods.

Foods: Broccoli,Shrimp,Cabbage
Dishs: 
Shrimp and Cabbage Stir-Fry with Broccoli: This is a quick and easy dish that can be made by stir-frying shrimp, cabbage, and broccoli with some garlic, ginger, and soy sauce.
Broccoli and Shrimp Alfredo: This is a creamy pasta dish that combines shrimp and broccoli with a rich Alfredo sauce.
Cabbage and Shrimp Salad: This is a refreshing salad that combines shredded cabbage, cooked shrimp, and a tangy dressing made with vinegar, honey, and Dijon mustard.
Foods: Wakame seaweed, Shiitake mushroom, Kombu kelp, Lettuce, Carrot
Dishs: 
Wakame and Shiitake Mushroom Miso Soup: This is a traditional Japanese soup that combines wakame and shiitake mushrooms with a savory miso broth.
Kombu Kelp and Carrot Salad: This is a refreshing salad that combines sliced kombu kelp and shredded carrots with a tangy dressing made with rice vinegar, soy sauce, and sesame oil.
Lettuce and Shiitake Mushroom Stir-Fry: This is a quick and easy dish that can be made by stir-frying sliced shiitake mushrooms and chopped lettuce with some garlic, ginger, and oyster sauce.
Foods:ご飯、豆腐、鯖、きのこ
Dishs:
豆腐ときのこの煮物：豆腐やきのこを出汁で煮込んだ和風の煮物で、優しい味わいが特徴です。
鯖の塩焼き：塩を振って焼いた鯖は、香ばしくて食欲をそそります。ご飯に合わせていただくと美味しいです。
きのこリゾット：米を炊き上げたリゾットに、きのこを加えてクリーミーな仕上がりにします。豆腐をトッピングするのもおすすめです。
Foods:マグロ、卵、椎茸、アスパラガス
Dishs:
マグロの漬け丼：醤油やみりん、酢などで味付けしたマグロをご飯の上に乗せていただく、定番の日本の丼物です。卵黄をトッピングすると濃厚で美味しいです。
椎茸とアスパラのバター醤油炒め：バターと醤油で調理した椎茸とアスパラを炒めた一品です。卵を加えると、よりクリーミーで美味しい仕上がりになります。
マグロのタルタル丼：タルタルソースを乗せたマグロ丼です。卵や椎茸、アスパラと合わせても美味しいです。
Foods:パン　米　牛乳　ビール　納豆
Dishs:
フレンチトースト - パンを牛乳に浸して卵でとじ、熱したフライパンで焼く。朝食に最適な料理です。
炊き込みご飯 - 米にお好みの具材を加えて炊き上げる。例えば、鶏肉、野菜、卵、納豆など。
ビールバッターチキン - ビールとバターで調理したジューシーなチキンの料理。スパイシーな味わいが特徴的です。
Foods: ${foodList}
Dishs:`
}
