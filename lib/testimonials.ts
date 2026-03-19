export type Testimonial = {
  id: number
  agent: 'Luke Nass' | 'Andrew Hill'
  agentImage: string
  reviewer: string
  quote: string
  title?: string
  date?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    agent: 'Andrew Hill',
    agentImage: '/andrew-hill-portrait.png',
    reviewer: 'Philip Sheridan',
    quote:
      "I recently had the pleasure of working with Andy to sell my property, and I cannot speak highly enough of the exceptional service and expertise I received throughout the entire process. From our first meeting, it was evident that he was a dedicated professional who takes great pride in delivering outstanding results for his clients. He took the time to thoroughly understand my goals and expectations, and his knowledge of the local real estate market was truly impressive. Throughout the sale process, he demonstrated a keen understanding of effective marketing strategies utilising both traditional and digital channels to showcase my property to its fullest potential. The high-quality photographs and compelling property description he provided undoubtedly played a crucial role in attracting potential buyers. One of his standout qualities is his excellent communication skills. He kept me informed at every stage of the process, promptly responding to my inquiries, and providing updates on the progress of the sale. This level of transparency and responsiveness made the entire experience smooth and stress-free. His negotiation skills are an area where he truly excels where he employed a strategic approach to secure the best possible deal for my property. These negotiation skills were evident in achieving a sale price that exceeded my expectations, and I couldn't be more pleased with the outcome. In addition to Andy's professional competence was his capability in attracting - and securing - a buyer that more suited the property's features as opposed to the several property investors who were also keen to purchase the property. He displayed genuine commitment and compassion to ensure the purchaser's satisfaction as well, and it was clear that he genuinely cared about achieving the best outcome for both parties. In conclusion, I wholeheartedly recommend Andy to anyone looking to sell their property. He is a consummate professional who combines market expertise, effective communication, and a commitment to client success. My experience with him exceeded all expectations, and I am truly grateful for the outstanding service he provided in facilitating the sale of my property.",
  },
  {
    id: 2,
    agent: 'Andrew Hill',
    agentImage: '/andrew-hill-portrait.png',
    reviewer: 'Nigel and Wendy',
    quote:
      'Andrew recently sold our house in Kelmscott and we are thrilled with the result. Andrew was so responsive and supportive throughout the entire process, including the many maintenance issues which needed resolving. We were so impressed with the level of service from start to finish. Would highly, highly recommend.',
  },
  {
    id: 3,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Margaret',
    quote:
      "Hi Luke, I just wanted to say a big thank you to you personally for acting on my behalf to sell our Kelmscott property. I appreciate the time and effort you put into marketing, and for showing the property to prospective buyers as they requested. Thank you for selling the property quickly and for your professionalism at all times, especially when dealing with hiccups along the way. You made the transaction smooth sailing and it's a credit to you and speaks volumes about your work ethic. Although I don't live in the Kelmscott area, I would not hesitate to recommend your business to anyone in need of a realtor local to you. Best wishes for continued success in your business.",
  },
  {
    id: 4,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Sue and Brenton',
    title: 'Our partnership with Luke Nass',
    quote:
      "Brenton and I decided to sell our house in Mount Nasura some time before we actually got around to finding the real estate agent that we chose. We spoke to a couple of agents in the area but something didn't gel for us. After seeing a Luke Nass sign in our street we gave Luke a call and from the moment we spoke to Luke we knew that we could work with him to sell our property. So we chose Luke Nass to partner us in the sale of our home. Luke made some really helpful suggestions about the presentation of the property which we took on board and worked hard to get the property ready for listing. At the same time Luke listened to our thoughts about the price and designed an innovative and unique sale process for us. We were in a pretty low market at the end of 2018 so every extra effort was put in by both Luke and ourselves to present and market the property in the best possible light to achieve our goal. We diverged from our original path along the way. Luke listened and understood our needs. We deferred the listing for a few weeks. Luke was fantastic in the way he worked with us. When we finally launched the for sale sign and put the property on the internet, Luke worked hard and did everything he said he would. The property was sold within a month and we had the proceeds in our bank before Christmas 2018 exactly as Luke forecast in our early discussions. For your knowledgeable, hardworking and professional partner in selling your biggest asset we cannot recommend more highly than Luke Nass. Thanks Luke.",
  },
  {
    id: 5,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Paul Field',
    date: '3 June 2016',
    quote:
      'Luke was efficient and knowledgeable, more trustworthy than the average real estate agent.',
  },
  {
    id: 6,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Ross and Shannon',
    date: '1 June 2016',
    quote:
      "Luke Nass and Laura were fantastic to deal with when myself and my partner were purchasing a house listed with Luke's company. They are both personable and professional, and bent over backwards to help us through every stage of the process. Luke went above and beyond to communicate between us as purchasers and the sellers outside of work hours, and had infinite patience when we were hard to contact. He negotiated very well on our behalf and came to an outcome that the sellers and we were very happy with. I would not hesitate to use Luke again, and fully recommend his team.",
  },
  {
    id: 7,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Owen and Jessica',
    date: '26 May 2016',
    quote:
      'Dealt with Luke Nass throughout the lead up to recently purchasing our house in Roleystone. Luke demonstrated a very professional, but personal manner and I appreciated his willingness to open the house to us outside of nominated times. He was honest in regard to each question we had and his follow up after the purchase was appreciated also. I would highly recommend him to any prospective sellers or buyers looking for real estate.',
  },
  {
    id: 8,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Lee and Teresa',
    date: '23 May 2016',
    quote:
      'Luke provided a very efficient and professional service. I would recommend him highly.',
  },
  {
    id: 9,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Sue and Gary',
    date: '20 May 2016',
    quote:
      "It's been 20 years since we bought our last house. Luke sold that house to us and his professionalism and understanding shone through. So when it was time to sell our house we approached Luke and as expected he did an absolute first class job of presenting and selling the house. In the current market he helped us put the house on at the right price with the right strategy and it sold without any major stress or dramas. We couldn't be happier with Luke's service - it shows - we also purchased a block of land from him!",
  },
  {
    id: 10,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Raj Wandimal',
    date: '19 May 2016',
    quote:
      'I would highly recommend Luke Nass and his office. At all times they were professional, informative, communicative and attentive to my requests. I would advise anyone considering selling to utilize Luke Nass expertise. He sold my home within a few weeks without any problems.',
  },
  {
    id: 11,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Wendy and Kim',
    date: '18 May 2016',
    quote:
      'I would just like to say that I would recommend Luke Nass to anyone who requires an honest and trustworthy real estate agent. My family and I have dealt with Luke for almost 25 years and found him to be honest and his integrity is beyond reproach. I can always ring him to get advice about real estate, he is always very courteous, nothing is too much trouble, and when he says "I will get back to you" he does.',
  },
  {
    id: 12,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Rob and Sandra',
    date: '13 May 2016',
    quote:
      'We found Luke Nass to be entirely credible, honest and professional. I would highly recommend Luke to my friends and family when they are in the business of selling their property.',
  },
  {
    id: 13,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Fiona and Damien',
    date: '10 May 2016',
    quote:
      'Luke was very professional at all times, good communication and sold our home in a short time. Thank you Luke.',
  },
  {
    id: 14,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Tony and Marie',
    date: '5 May 2016',
    quote:
      'Following three months fruitless and frustrating experience trying to sell a property through another agent from our area, Luke Nass had our sale wrapped up in scarcely more than a week. Very understanding, efficient and painless. We have no idea why we did not turn to him in the first place, having dealt with Luke very successfully in the past. Our most sincere thanks.',
  },
  {
    id: 15,
    agent: 'Luke Nass',
    agentImage: '/luke-nass-portrait.png',
    reviewer: 'Brad and Diana',
    date: '3 September 2015',
    quote:
      'We are very lucky to have had Luke Nass as our realtor for both the sale of our property and also the purchase of our new home. Luke has been very easy to deal with throughout the entire process. A+ with communication and status updates of both properties. I would have no hesitation in recommending Luke Nass. Thanks again for everything Luke!',
  },
]
