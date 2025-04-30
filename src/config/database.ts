import { connect } from "mongoose";

export const connectDB = () => {
  const MONGOOSE_URI: string = (() => {
    const uri = process.env.MONGOOSE_URI;
    if (!uri) {
      throw new Error("Missing MONGOOSE_URI environment variable");
    }
    return uri;
  })();
  connect(MONGOOSE_URI);
};
