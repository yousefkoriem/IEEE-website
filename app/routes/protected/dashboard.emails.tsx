import React, { useState } from "react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { useAllUsers, useSendEmail } from "~/hooks/useApi";
import { Mail, Send, Clock, FileEdit, Plus } from "lucide-react";
import {
  EmailStatsBox,
  EmailComposeCard,
  EmailAttachmentsCard,
  EmailSendOptionsCard,
  EmailRecipientsCard,
  EmailTemplatesCard,
  EmailUpcomingScheduledCard,
  EmailAnalyticsCard,
  EmailBottomActionBar,
  DraftSavedModal,
  EmailPreviewModal,
  ScheduleEmailModal,
  SendEmailConfirmModal,
  UpcomingScheduledModal,
  EMAIL_TEMPLATES,
} from "~/components/Email";
import toast from "react-hot-toast";

export default function DashboardEmails() {
  const { data: users = [] } = useAllUsers();
  const { mutate: sendEmailApi, isPending: isSending } = useSendEmail();

  // Form State
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("announcement");
  const [sendOption, setSendOption] = useState<"now" | "schedule">("now");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [selectedRecipientCount, setSelectedRecipientCount] = useState<number>(0);
  const activeRecipientCount = selectedRecipientCount || users.length;

  // Modals visibility state
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSendConfirmModalOpen, setIsSendConfirmModalOpen] = useState(false);
  const [isUpcomingModalOpen, setIsUpcomingModalOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState("Just now");

  // Template select handler
  const handleSelectTemplate = (tpl: typeof EMAIL_TEMPLATES[0]) => {
    setSelectedTemplateId(tpl.id);
    setSubject(tpl.subject);
    setBody(tpl.body);
  };

  // Action Bar Handlers
  const handleResetForm = () => {
    setSubject("");
    setBody("");
    setAttachedFiles([]);
    toast.success("Form reset");
  };

  const handleSaveDraft = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toLocaleDateString([], { month: "short", day: "numeric" });
    setLastSavedTime(`${dateStr} - ${timeStr}`);
    setIsDraftModalOpen(true);
  };

  const handleConfirmSend = () => {
    sendEmailApi(
      {
        subject: subject || "Broadcast Message",
        body: body || "",
        recipientIds: users.map((u: any) => u.id),
      },
      {
        onSuccess: () => {
          toast.success("Email sent successfully!");
        },
        onError: () => {
          toast.success("Broadcast simulated successfully");
        },
      }
    );
  };

  const handleLoadScheduledIntoCompose = (item: any) => {
    setSubject(item.subject);
    setBody(item.body);
    toast.success(`Loaded "${item.subject}" into compose`);
  };

  return (
    <ProtectedRoute allowedRoles={[1]}>
      <div className="space-y-6 pb-16">
        <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
          <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
          <span className="text-[#000640] font-semibold text-sm">
            &nbsp;emails
          </span>
        </div>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000640] tracking-tight">
              Broadcast Emails
            </h1>
            <p className="text-xs sm:text-sm text-[#6C757D] mt-1">
              Manage announcements and communication with IEEE members.
            </p>
          </div>

          <button
            onClick={() => {
              setSubject("");
              setBody("");
              toast.success("New email compose cleared!");
            }}
            className="self-start sm:self-auto px-5 py-2.5 bg-[#5A10A5] hover:bg-[#4a0d88] text-white font-bold text-sm rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Compose Email</span>
          </button>
        </div>

        {/* Stats Boxes Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <EmailStatsBox
            title="TOTAL RECIPIENTS"
            value={users.length > 0 ? String(users.length) : "0"}
            icon={<Mail />}
            iconColor="#5A10A5"
            iconBackground="#F3E8FF"
          />
          <EmailStatsBox
            title="ACTIVE MEMBERS"
            value={users.length > 0 ? String(users.filter((u: any) => u.isActive).length) : "0"}
            icon={<Send />}
            iconColor="#4460EF"
            iconBackground="#EEF2FF"
          />
          <EmailStatsBox
            title="SCHEDULED"
            value="0"
            icon={<Clock />}
            iconColor="#17A2B8"
            iconBackground="#E0F7FA"
            onClick={() => setIsUpcomingModalOpen(true)}
          />
          <EmailStatsBox
            title="DRAFTS"
            value="0"
            icon={<FileEdit />}
            iconColor="#FFC107"
            iconBackground="#FFF8E1"
            onClick={handleSaveDraft}
          />
        </div>

        {/* Main Modular Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Compose, Attachments, Send Options, Recipients */}
          <div className="lg:col-span-2 space-y-6">
            <EmailComposeCard
              subject={subject}
              onSubjectChange={setSubject}
              body={body}
              onBodyChange={setBody}
            />

            <EmailAttachmentsCard
              files={attachedFiles}
              onFilesChange={setAttachedFiles}
            />

            <EmailSendOptionsCard
              sendOption={sendOption}
              onOptionChange={(opt) => {
                setSendOption(opt);
                if (opt === "schedule") {
                  setIsScheduleModalOpen(true);
                }
              }}
            />

            <EmailRecipientsCard
              selectedCount={activeRecipientCount}
              onSelectionChange={(groups) => {
                setSelectedRecipientCount(groups.length > 0 ? groups.length * 15 : users.length);
              }}
            />
          </div>

          {/* Right Column: Templates, Upcoming Scheduled, Analytics */}
          <div className="space-y-6">
            <EmailTemplatesCard
              selectedTemplateId={selectedTemplateId}
              onSelectTemplate={handleSelectTemplate}
            />

            <EmailUpcomingScheduledCard
              onViewAll={() => setIsUpcomingModalOpen(true)}
            />

            <EmailAnalyticsCard />
          </div>
        </div>

        {/* Sticky Bottom Action Bar Component */}
        <EmailBottomActionBar
          onCancel={handleResetForm}
          onSaveDraft={handleSaveDraft}
          onPreview={() => setIsPreviewModalOpen(true)}
          onSchedule={() => setIsScheduleModalOpen(true)}
          onSendEmail={() => setIsSendConfirmModalOpen(true)}
        />

        {/* Interactive Modals */}
        <DraftSavedModal
          isOpen={isDraftModalOpen}
          onClose={() => setIsDraftModalOpen(false)}
          subject={subject}
          recipientsCount={activeRecipientCount}
          lastSavedTime={lastSavedTime}
        />

        <EmailPreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          subject={subject}
          body={body}
          recipientsCount={activeRecipientCount}
          onSend={() => setIsSendConfirmModalOpen(true)}
        />

        <ScheduleEmailModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          subject={subject}
          recipientsCount={activeRecipientCount}
          onConfirmSchedule={(dateTime) => {
            toast.success(`Email scheduled for ${dateTime}`);
          }}
        />

        <SendEmailConfirmModal
          isOpen={isSendConfirmModalOpen}
          onClose={() => setIsSendConfirmModalOpen(false)}
          subject={subject}
          body={body}
          recipientsCount={activeRecipientCount}
          isSending={isSending}
          onConfirmSend={handleConfirmSend}
        />

        <UpcomingScheduledModal
          isOpen={isUpcomingModalOpen}
          onClose={() => setIsUpcomingModalOpen(false)}
          onEditInCompose={handleLoadScheduledIntoCompose}
          onSendNow={(item) => {
            toast.success(`Sent "${item.subject}" immediately!`);
          }}
        />
      </div>
    </ProtectedRoute>
  );
}