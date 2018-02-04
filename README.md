# Amne-Agents

## Website: 
https://amne-agents.herokuapp.com/  

**Note:** It might take a minute to build on the first time running on Heroku due to Heroku's sleeping policy

### Layout  
**(what, how, why @ Material-UI)**  

I used Material-UI for its beautiful and highly customizable components.
This allow me to prototype (mock-up) the application quickly and move on to implementing
api services calls to dynamically getting and processing the data. Initially,
I was going to build a full one-page web application, with navigation bar and tutorials.
Hence, the _**NavBar**_ component is still in place, but I have repurposed it as the form title.
However, as I proceed on, I realized that I spent too much time trying think ahead and was no where
near finishing the mock-up. So, I decided to list out critical components. Namely, those are
_**Input**_ (the 2 addresses inputs along with all the dynamic error checking), 
_**WebMap**_ (wrapper component of a React-Google-Map library) and 
_**ResultList**_ (showing results after submission).
  
The UI is simple and self-explanatory to use. The input fields feature auto-completing addresses.
Quite frankly, I didn't put much thought into the **Reset** button, but I just think that it looks nicer
in a pair instead of just **Submit**. 
  
After a submission, you will either get some error help text under each input field 
to notify you of an error calling the APIs below, or you will be the result listing.
The result listing is order by total distance in _**meters**_ (distance away from #1 + distance away from #2) 
and converted into miles for US-friendly (hah) purposes. I will talk about how the distance logic
works in the section below.
  
On the map after submission, all of the top 10 locations are listed, along with 3 additional places labeling
_Address #1_, _Address #2_, _Midpoint_ (which I will explain in the logic secion) colored as red, blue, and gray
respectively. When the user clicks on one of the pin, there is a _Popover_ that inform the user
about the location marked compared to the listing or inputs.
 

### Code logic   
**(what, how, why  @ Yelp-Fusion and GoogleMap APIs)**

I've decided to use Yelp-Fusion API to look up real estate agency because it provides a more useful information
and the process of authentication is much less complicated. The API itself allowed me to search by coordinates
for "Real Estate Services", within a max of 25 miles radius, and sort them by bird distance away from coordinates given.
This is where my _**midpoint**_ location logic that I mentioned above. Every time the user give the app 2 valid
addresses, it will be converted into 2 coordinates pairs. Then, I simply taking the average of each pair's latitude, longtitude
to make a _**midpoint**_ coordinate to be used for Yelp's search. The reason is simple. When searching
between 2 addresses for spots that would result in the least distance combined when travel from both places,
the best possible case would be the bird distance midpoint between the two. Hence, if I search for top 10
real estate agencies around the midpoint, it will automatically be the top 10 that would eliminate all irrelevant
results.
  
After I have the addresses, I call GoogleMap's distance matrix API to give it my 2 input coordinates pairs
and a list of all the coordinates pairs that I get back for top 10 location from Yelp. I label the result
directly into the JSON data that Yelp sent back for me, so that I don't have to worry about another different state
value. After I've crossed information needed from both API, the JSON data containing information about all businesses
are passed along for any child component that need it (all of them).
### Self-Evaluation
**(how do I feel about _amne-agents_)**

Since it was in a short period of time, the application is sure to has some limitations that I 
didn't have to fix/implement. I will list and explain them below, but overall, I feel satisfied with
how it turns out. This is the first time I use Material-UI, so sadly, I spent a lot of time reading
documentation on best practices to use the framework. I am rather happy to see how well it blends all components
together. 

There are error checking for the input data and submission, but I have very little
error checking for Yelp API and Google Map's distance matrix API. This could lead to unexpected failures,
but during development time, it mostly didn't happen, so I didn't prioritize it as much. 

The web application is not yet optimal. The way I'm passing the data around is not yet streamlined in the
code base, so it gets quite confusing sometimes. Worse, all components are relying on a good batch of properties input.
If anything is out of place, it would just simply fail the application. It should just provide an error message instead.
It would require a good amount of refactoring to make the code optimal and efficient.
  
Some other features that I didn't get to implement that would make user-experience better:
- When click on a pin, the list doesn't actually roll down to the correct one.
- Vice versa, there should be a button to highlight a picked agency on the given map.
- Quite frankly, the distance logic that I used might be to naive, and I didn't test it out to guarantee 100% success.
- There are not limit on where to search from. So you can search for example US and Vietnam, which would put the 
midpoint in the ocean. I don't think we want that.
- The responsiveness on phone mobile devices vary too much from phone to phone. I should have designed a more robust
mobile responsive design one as well.
- Images are from Yelp-Fusion API as well, so sometimes it's not a well-represented picture of the business.

## Suggestion  
**(what should Amne build and how)**

Compared to traditional real estate services, I think Amne's uniqueness revolves around customer's 
ability to independently research, buy, and sell houses. Hence, it is the utmost importance that Amne
should always continue providing features that are customer-centric online experience. I have several
thoughts about _Virtual Visiting_ houses, and _3D Home modeling_ like Zillow. 
  
However, as Amne eventually gets  more online traffic, building a chat bot to guide new customers or for customer-related issues would
be valuable. The chat bot doesn't have to be an actual bot. Amne could outsource the customer support
for a much cheaper price than developing a bot unique to Amne. Then, Amne could use this to gather
data and make sense more about any customers who choose to use the service. All Amne has to implement
is the Web UI for the customer to communicate with an agent. There are tons of great SaaS solutions
out there that can accomplish that in just a few lines of code.

This chat bot could pop up any site that the customer spends more than 5 minutes on, for example.
That customer might be wondering something that web page that is outlined the FAQ 
(that most customers probably don't even read) or a more sophisticated question that require a
trained agent to communicate with. Either way, the chat bot services would encourage more interaction
with customers and make sure that they get all answers to their question.