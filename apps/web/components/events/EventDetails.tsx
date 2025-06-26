
export const EventDetails = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4 mt-10">
      <h2 className="text-xl font-semibold text-gray-900">About the event</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
        <div>
          <div className="font-medium text-gray-500">Source of Truth</div>
          <div className="text-gray-800">iplt20.com</div>
        </div>
        <div>
          <div className="font-medium text-gray-500">Trading started on</div>
          <div className="text-gray-800">26 Jun, 2025</div>
        </div>
        <div>
          <div className="font-medium text-gray-500">Event expires on</div>
          <div className="text-gray-800">27 Jun, 2025</div>
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-2">
        <div>
          <h3 className="font-medium text-gray-900">
            Event Overview & Statistics
          </h3>
          <p>
            Bengaluru and Kolkata are set to clash in a high-stakes cricket match.
            Bengaluru has shown strong form recently, especially in chasing totals,
            while Kolkata boasts a well-rounded bowling attack. Factors like pitch
            condition, toss, and player form will influence the outcome.
            <span className="text-blue-600 cursor-pointer"> Read More</span>
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">Rules</h3>
          <p>
            TIME - The event will expire at 11:59 PM on 27 June 2025 or earlier if
            the match ends. SETTLEMENT - The event will be settled based on the
            official result declared on iplt20.com. If the match is abandoned,
            the event may be cancelled or extended as per platform guidelines.
            <span className="text-blue-600 cursor-pointer"> Read More</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
