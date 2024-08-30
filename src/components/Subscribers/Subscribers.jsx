import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { AiOutlineUser, AiFillPlayCircle, AiOutlineBell, AiFillBell } from 'react-icons/ai'; // Importing Icons from react-icons
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { AiOutlineFrown } from 'react-icons/ai';

function Subscribers({ currentUserid }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState({}); // Object to track subscription status

  const fetchSubscribers = async (currentUserid) => {
    if (currentUserid) {
      try {
        const response = await axios.get(`/api/v1/subscribe/u/${currentUserid}`);
        if (Array.isArray(response.data.data.subscriptions)) {
          setSubscriptions(response.data.data.subscriptions);
          const subscriptionStatus = {};
          response.data.data.subscriptions.forEach(sub => {
            subscriptionStatus[sub.channel._id] = true;
          });
          setSubscribedChannels(subscriptionStatus);
        }
      } catch (error) {
        console.error(`Error fetching owner with ID ${currentUserid}:`, error);
      }
    }
  };

  const handleSubscribe = async (channelId) => {
    try {
      const response = await axios.post(`/api/v1/subscribe/c/${channelId}`);
      if (response.status === 200) {
        setSubscribedChannels(prevStatus => {
          const newStatus = { ...prevStatus };
          if (newStatus[channelId]) {
            delete newStatus[channelId];
            toast.success('Unsubscribed successfully! 👌');
          } else {
            newStatus[channelId] = true;
            toast.success('Subscribed successfully! 🔥');
          }
          return newStatus;
        });
      }
    } catch (error) {
      console.error(`Error toggling subscription for channel ID ${channelId}:`, error);
      toast.error('Error toggling subscription.');
    }
  };

  useEffect(() => {
    fetchSubscribers(currentUserid);
    AOS.init({ duration: 1200 });
  }, [currentUserid]);

  return (
    <div className="w-full">
      {subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription, index) => (
            <div
              key={index}
              className="bg-[#0D141A] shadow-left-top shadow-cyan-500 rounded-lg p-4 ring-1 ring-cyan-500"
              data-aos="fade-up"
            >
              <div className="flex md:flex-row flex-col items-center mb-4">
                <div className=' border-2 w-12 h-12 border-cyan-200 sm:mb-0 mb-4 rounded-full overflow-hidden'>
                <img
                  src={subscription.channel.avatar}
                  alt={subscription.channel.fullname}
                  className="w-full h-full object-cover"
                />
                </div>
                
                <div className="sm:ml-4 md:inline-block flex flex-col-reverse items-center">
                  <h2 className="text-white sm:text-base text-xs font-bold flex items-center">
                    <AiOutlineUser className="mr-2" />
                    {subscription.channel.fullname}
                  </h2>
                  <p className="text-cyan-400 sm:mb-0 mb-1 text-xs md:text-sm">@{subscription.channel.username}</p>
                </div>
              </div>
             
              <div className="flex flex-col md:flex-row items-center mt-4 space-y-2 md:space-y-0 md:space-x-2">
                <button className="bg-cyan-500 text-[#0D141A] py-2 px-4 rounded-lg hover:bg-cyan-400 transition duration-300 flex items-center">
                  <AiFillPlayCircle className="mr-2" />
                  Visit Channel
                </button>
                <button
                  onClick={() => handleSubscribe(subscription.channel._id)}
                  className={`${subscribedChannels[subscription.channel._id] ? null : "bg-red-400"} bg-cyan-500 text-[#0D141A] py-2 px-4 rounded-lg hover:bg-cyan-400 transition duration-300 flex items-center`}
                >
                  {subscribedChannels[subscription.channel._id] ? <AiFillBell className="mr-2" /> : <AiOutlineBell className="mr-2" />}
                  {subscribedChannels[subscription.channel._id] ? 'Unsubscribe' : 'Subscribe'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center h-full p-9 sm:p-6 md:p-0">
      <AiOutlineFrown className="text-cyan-500 text-4xl sm:text-5xl mb-4" />
      <h2 className="text-cyan-500 text-xl sm:text-2xl md:text-3xl font-bold text-center">
        No subscriptions yet!
      </h2>
      <p className="text-gray-400 italic mt-4 text-center text-sm sm:text-base md:text-lg max-w-md">
        "Subscribe to channels that inspire you, motivate you, and help you grow. Don’t miss out on amazing content!"
      </p>
    </div>
      )}
    </div>
  );
}

export default Subscribers;
