from app.models import db, environment, SCHEMA, User, Product
from sqlalchemy.sql import text


def seed_products():
    location = 'https://my-kastha-shop-bucket.s3.us-east-2.amazonaws.com/kastaimages/'
    categories = Product.allowed_categories()
    # c = ["Thanka Paintings", "Budda Statues","Singings Bowls", "Prayer Flags", "Prayer Wheels", "Others" ]
    
    products = [

          {
            "seller_id": 1,
            "name": "Colorful Gheri Drawstring Bag",
            "price": 49,
            "category": categories[5],
            "description": "This is a lovely hemp bag with traditional Gheri fabric. This bag is lightweight and looks trendy. This bag has larger space to carry your belongings.",
            "product_image": location + "nepbag3.png"
        },
        
          {
            "seller_id": 1,
            "name": "Hemp Cotton Stripe Rucksack",
            "price": 59,
            "category": categories[5],
            "description": "This eco-friendly backpack hails from Nepal and is crafted from a blend of 55 hemp and 45 percent cotton fibers.",
            "product_image": location + "nepbag2.png"
        },
        {
            "seller_id": 1,
            "name": "Original Rudraksha Mala, 1.5 ft long",
            "price": 10.00,
            "category": categories[5],
            "description": "This Rudraksha is often addressed as Devguru, Guru of all Devas ,Very useful for Meditation also Wearing this Rudraksha type around your heart area is consid",
            "product_image": location + "beed1.png"
        },

           {
            "seller_id": 1,
            "name": "Original Rudraksha Mala, 1.5 ft long",
            "price": 10.00,
            "category": categories[5],
            "description": "This Rudraksha is often addressed as Devguru, Guru of all Devas ,Very useful for Meditation also Wearing this Rudraksha type around your heart area is consid",
            "product_image": location + "beed2.png"
        },

         {
            "seller_id": 1,
            "name": "Amitabh Buddha Tibetan Buddhist Thangka Painting",
            "price": 100,
            "category": categories[1],
            "description": "Amitabh Buddha is seated in a Dhyana Aasan or meditative posture with a vase in his hands. This painting is hand drawn on primed cotton canvas and hand painted. ",
            "product_image": location + "buddapainting1.png"
        },

               {
            "seller_id": 1,
            "name": "God Of Compassion Chenrezig Thangka",
            "price": 149,
            "category": categories[1],
            "description": "Four Arm Chenrezig is the Buddha of infinite compassion. The four arms signify the four immeasurable attitudes of love, compassion, equanimity, and joy.",
            "product_image": location + "buddapainting5.png"
        },
           {
            "seller_id": 1,
            "name": "Gurka Service Issue Khukuri Knife, Hand forged 10 Inch",
            "price": 299,
            "category": categories[5],
            "description": "Current British Gurka Issue Khukuri: This Kukri is the replica of current British Service Issue and was used since 1995 till date. Featuring a genuine handmade traditional kukri that represents honor, dignity, courage and loyalty and carries religious values among the people in Nepal.",
            "product_image": location + "khukuri.png"
        },

               {
            "seller_id": 1,
            "name": "Tibetan Prayer Flags",
            "price": 29,
            "category": categories[5],
            "description": "These are set of 5 rolls of Small Tibetan Prayer Flags. These Tibetan Prayer Flags are hand printed using wooden prayer flag blocks. The printing are of various Tibetan Deities and the mantras associated with them.",
            "product_image": location + "peaceflag1.png"
        },
                {
            "seller_id": 1,
            "name": "White Tara Tibetan Prayer Flags",
            "price": 29,
            "category": categories[5],
            "description": "This is a handmade Tibetan Prayer flags printed with Tibetan deities White Tara. The most powerful of all, the White Tara is a Tibetan Goddess worshiped throughout the world.",
            "product_image": location + "peaceflag3.png"
        },

                      {
            "seller_id": 1,
            "name": "Seven Chakra Healing Tibetan Singing Bowl",
            "price": 199,
            "category": categories[3],
            "description": "This is a brass singing bowl hand carved in Nepal. The singing bowl is beautifully carved with seven chakra symbol of human body in a meditative posture. ",
            "product_image": location + "singbowl1.png"
        },


                      {
            "seller_id": 1,
            "name": "Blessings Hamsa Singing Bowl for Relaxation",
            "price": 199,
            "category": categories[3],
            "description": "The Blessings Hamsa Singing Bowl is a unique and spiritually significant musical instrument, often handcrafted and adorned with Hamsa symbols.",
            "product_image": location + "singbowl3.png"
        },


     {
            "seller_id": 2,
            "name": "Fine and Detailed Painting Tibetan Mandala Thangka",
            "price": 199,
            "category": categories[1],
            "description": "This wonderful art painting is done by Nepalese artist. Mandala is a circle which is a device for the Tantric meditation. It is a visual aid for concentration and introversive meditation.",
            "product_image": location + "thanpaint1.png"
        },

         {
            "seller_id": 2,
            "name": "Conch Mandala Tibetan Thangka Painting",
            "price": 199,
            "category": categories[1],
            "description": "This is a beautifully hand painted mandala thangka painting from Nepal. One of the auspicious symbol Conch is painted in the center of the mandala.",
            "product_image": location + "thanpaint4.png"
        },

        {
            "seller_id": 2,
            "name": "Gold Plated Shakyamuni Buddha Statue 5.5",
            "price": 200,
            "category": categories[2],
            "description": "Shakyamuni Buddha, also known as Gautama Buddha, is the historical founder of Buddhism. He renounced his princely life to seek enlightenment and the truth of existence.",
            "product_image": location + "statue1.png"
        },

        {
            "seller_id": 2,
            "name": "Antique Gilted Crown Buddha Statue 11' H",
            "price": 178.99,
            "category": categories[2],
            "description": "The Crown Buddha refers to depictions of Shakyamuni Buddha wearing a crown, often with specific hand gestures called mudras. These representations symbolize his enlightened qualities, wisdom, and compassion.",
            "product_image": location + "statue4.png"
        },
        {
            "seller_id": 2,
            "name": "Masterarts Shakyamuni Budda Head 16.5' H",
            "price": 299,
            "category": categories[2],
            "description": "The Shakyamuni Buddha is seated on a lotus as platform, holds a vase in his left hand and meditating calmly while is hand touches the ground in the Bhumisparsa pose. This statue is made of resin.",
            "product_image": location + "statue3.png"
        },
        {
            "seller_id": 2,
            "name": "Antique Copper Gilted Shakyamuni Buddha Statue 8 H",
            "price": 350,
            "category": categories[2],
            "description": "Shakyamuni Buddha, also referred to as Gautama Buddha, is the historical figure who achieved enlightenment more than 2,500 years ago.",
            "product_image": location + "statue2.png"
        },

          {
            "seller_id": 2,
            "name": "Eight Auspicious Desktop Copper Prayer Wheel",
            "price": 149,
            "category": categories[4],
            "description": "The Eight Auspicious Symbols, Tashi Tagye in Tibetan, embellish the cylindrical body, each representing spiritual enlightenment. The Endless Knot signifies interdependence,",
            "product_image": location + "playerwheel1.png"
        },
       
            {
            "seller_id": 2,
            "name": "5 in 1 Prayer Wheel with Potala Incense Burner Top",
            "price": 199,
            "category": categories[4],
            "description": "This is a unique and one of a kind 5 in 1 Copper Prayer Wheel in a beautiful Tibetan Potala Palace Design metal frame. The 5 copper prayer wheels are filled with paper rolls full of powerful Om Mani Mantra inside the hollow cylinder. ",
            "product_image": location + "playerwheel2.png"
        },
    ]


    [db.session.add(Product(**product)) for product in products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
