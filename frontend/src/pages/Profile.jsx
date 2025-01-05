import ActivityTimeline from "@/components/profile/ActivityTimeline";
import TemplateCard from "@/components/profile/TemplateCard";
import UserCard from "@/components/profile/UserCard";
import TagCloud from "@/components/tagCloud/TagCloud";
import { useLanguageStore } from "@/store/languageStore";
import { useUsersStore } from "@/store/usersStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = ({ userId }) => {
  const { dictionary: d } = useLanguageStore();
  let { id } = useParams();
  if (userId === undefined) userId = id;
  const { user, getUserById } = useUsersStore();

  useEffect(() => {
    getUserById(userId);
  }, [userId, getUserById]);

  return (
    <div className="w-[100%] min-h-screen flex flex-col lg:px-10 md:px-10 px-2  ">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
        <div className="flex items-center justify-center">
          <UserCard user={user} userId={id} />
        </div>
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-primary font-bold text-2xl">
            {d.recentActivities}
          </h1>
          <ActivityTimeline userId={userId} d={d} />
        </div>
      </div>
      <div className="mt-10">
        <p className="text-2xl font-bold text-primary text-center my-10">
          {d.recentTemplates}
        </p>

        {user?.templates.length === 0 ? (
          <p className="text-center italic text-gray-500">
            {d.noTemplatesYet}
          </p>
        ) : (
          <div className="flex justify-center">
            <TemplateCard templates={user?.templates} userId={userId} d={d} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
