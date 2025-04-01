import { GoogleGenerativeAI } from "@google/generative-ai";
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  console.log(apiKey);
//   const genAI = new GoogleGenAI(apiKey);

const genAI = new GoogleGenerativeAI(apiKey);

  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating. Also, suggest an itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating. Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display real-time information, including hotel prices, availability, images, and ratings from external websites.  Hotel prices are also highly dynamic and change constantly.  Therefore, I cannot provide the image URLs, exact pricing, and real-time ratings.\n\nHowever, I can give you a framework for a cheap Las Vegas trip for a couple, including a possible itinerary and hotel suggestions. You will need to use online travel agencies (like Booking.com, Expedia, Kayak, etc.) to find current pricing, availability, and images for the hotels and attractions.\n\n\n**Hotel Options (Use online travel agencies to check prices, availability, and images):**\n\n*(Note:  Prices are estimates and will vary greatly depending on the season and availability.  Look for deals and off-strip locations for budget options.)*\n\n| Hotel Name          | Approximate Price Range (per night) | Address                                  |\n|----------------------|------------------------------------|------------------------------------------|\n| Circus Circus Hotel & Casino | $30-$80+                            | 2880 S Las Vegas Blvd, Las Vegas, NV 89109 |\n| Motel 6 Las Vegas Strip | $40-$70+                            | Various locations near the Strip           |\n| The LINQ Hotel + Experience | $60 - $150+                         | 3535 Las Vegas Blvd S, Las Vegas, NV 89109 |\n| Luxor Hotel & Casino  | $50-$120+                            | 3900 Las Vegas Blvd S, Las Vegas, NV 89119 |\n\n\n\n**You'll need to find the geo-coordinates and ratings on sites like Google Maps or TripAdvisor.**\n\n\n**3-Day Las Vegas Itinerary for a Budget-Conscious Couple:**\n\n```json\n{\n  \"trip\": {\n    \"title\": \"Budget-Friendly Las Vegas Getaway (3 Days)\",\n    \"days\": [\n      {\n        \"day\": 1,\n        \"theme\": \"Free & Cheap Strip Exploration\",\n        \"plan\": [\n          {\n            \"time\": \"Morning (9:00 AM)\",\n            \"placeName\": \"Las Vegas Strip Walk\",\n            \"placeDetails\": \"Walk the Strip, admire the architecture, and take photos.  Many hotels have free displays and shows.\",\n            \"geoCoordinates\": \"[Find on Google Maps]\", \n            \"ticketPricing\": \"Free\",\n            \"rating\": \"[Check TripAdvisor]\"\n          },\n          {\n            \"time\": \"Afternoon (1:00 PM)\",\n            \"placeName\": \"In-N-Out Burger\",\n            \"placeDetails\": \"Enjoy a cheap and delicious lunch at a classic West Coast burger joint.\",\n            \"geoCoordinates\": \"[Find on Google Maps]\",\n            \"ticketPricing\": \"$10-$15 per person\",\n            \"rating\": \"[Check TripAdvisor]\"\n          },\n          {\n            \"time\": \"Evening (6:00 PM)\",\n            \"placeName\": \"Free Fountains of Bellagio Show\",\n            \"placeDetails\": \"Watch the mesmerizing Bellagio Fountains show.\",\n            \"geoCoordinates\": \"[Find on Google Maps]\",\n            \"ticketPricing\": \"Free\",\n            \"rating\": \"[Check TripAdvisor]\"\n          },\n          {\n            \"time\": \"Night (8:00 PM)\",\n            \"placeName\": \"Explore the casinos (Free)\",\n            \"placeDetails\": \"Check out the casinos – enjoy the atmosphere (gamble responsibly – set a budget!)\",\n            \"geoCoordinates\": \"[Find on Google Maps]\",\n            \"ticketPricing\": \"Free (Unless gambling)\",\n            \"rating\": \"[Check TripAdvisor]\"\n          }\n        ]\n      },\n      {\n        \"day\": 2,\n        \"theme\": \"Downtown & Fremont Street Experience\",\n        \"plan\": [\n          {\n            \"time\": \"Morning (10:00 AM)\",\n            \"placeName\": \"Fremont Street Experience\",\n            \"placeDetails\": \"Visit Downtown Las Vegas and explore the Fremont Street Experience with its light shows.\",\n            \"geoCoordinates\": \"[Find on Google Maps]\",\n            \"ticketPricing\": \"Free (unless you want to do ziplining, etc)\",\n            \"rating\": \"[Check TripAdvisor]\"\n          },\n          {\n            \"time\": \"Afternoon (1:00 PM)\",\n            \"placeName\": \"Eat at a Downtown Eatery\",\n            \"placeDetails\": \"Find affordable food options in Downtown Las Vegas.\",\n            \"geoCoordinates\": \"[Find on Google Maps]\",\n            \"ticketPricing\": \"$10-$20 per person\",\n            \"rating\": \"[Check TripAdvisor]\"\n          },\n          {\n            \"time\": \"Evening (5:00 PM)\",\n            \"placeName\": \"Container Park\",\n            \"placeDetails\": \"Explore Container Park, a unique shopping and entertainment area built from shipping containers.\",\n            \"geoCoordinates\": \"[Find on Google Maps]\",\n            \"ticketPricing\": \"Free (Shopping and dining extra)\",\n            \"rating\": \"[Check TripAdvisor]\"\n          }\n        ]\n      },\n      {\n        \"day\": 3,\n        \"theme\": \"Red Rock Canyon or Pool Day\",\n        \"plan\": [\n          {\n            \"time\": \"Morning (9:00 AM)\",\n            \"placeName\": \"Red Rock Canyon National Conservation Area (Optional)\",\n            \"placeDetails\": \"Explore stunning desert scenery.  Check for entrance fees.\",\n            \"geoCoordinates\": \"[Find on Google Maps]\",\n            \"ticketPricing\": \"[Check National Park Service website]\",\n            \"rating\": \"[Check TripAdvisor]\"\n          },\n          {\n            \"time\": \"Alternative Morning (9:00 AM)\",\n            \"placeName\": \"Hotel Pool Day\",\n            \"placeDetails\": \"Relax and enjoy the hotel pool (if included or cheap day pass available).\",\n            \"geoCoordinates\": \"[Your Hotel's Coordinates]\",\n            \"ticketPricing\": \"[Check your Hotel]\",\n            \"rating\": \"[Check your Hotel]\"\n          },\n          {\n            \"time\": \"Afternoon/Evening (1:00 PM onwards)\",\n            \"placeName\": \"Souvenir Shopping/Departure Prep\",\n            \"placeDetails\": \"Pick up souvenirs (budget-friendly options!), prepare for your departure.\",\n            \"geoCoordinates\": \"[Various locations]\",\n            \"ticketPricing\": \"Varies\",\n            \"rating\": \"[Various]\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\nRemember to always check for updated prices, opening hours, and potential booking requirements before your trip.  Have a fantastic and affordable time in Las Vegas!\n"},
          ],
        },
      ],
    });
  
    
  
  
