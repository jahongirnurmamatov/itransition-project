import TabelForms from "@/components/allForms/TableForms";
import Loading from "@/components/loading/Loading";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useTemplateStore } from "@/store/templateStore";
import React from "react";

const MyTemplates = () => {
  const { isLoading, error } = useTemplateStore();
  const { authUser } = useAuthStore();
  const { dictionary } = useLanguageStore();
  if (isLoading) {
    <Loading />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="w-full min-h-screen flex items-start justify-center">
      <div className="mx-auto w-[90%] my-6">
        <h1 className="text-2xl font-bold text-center text-primary mb-10">
          {dictionary.myTemplates}
        </h1>
        <TabelForms userId={authUser?.id} />
      </div>
    </div>
  );
};

export default MyTemplates;
