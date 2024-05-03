interface Participant {
  user_id: number;
  rating: number;
}
 
interface Link {
  title: string;
  url: string;
}

export default class Event {
  _id: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  image: string;
  participants: Participant[];
  links: Link[];
  type: string;
  max_participants: number;
  average_rating: number;

  constructor(
     _id: string,
      title: string,
      description: string,
      start_date: Date,
      end_date: Date,
      location: string,
      participants: Participant[],
      image: string,
      links: Link[],
      type: string,
      max_participants: number,
      average_rating: number
  ) {
      this._id = _id;
      this.title = title;
      this.description = description;
      this.start_date = start_date;
      this.end_date = end_date;
      this.location = location;
      this.participants = participants;
      this.image = image;
      this.links = links;
      this.type = type;
      this.max_participants = max_participants;
      this.average_rating = average_rating;
  }
}