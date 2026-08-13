"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@/components/ui/Button";

function buildContactSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    name: z.string().min(1, t("errors.nameRequired")),
    email: z
      .string()
      .min(1, t("errors.emailRequired"))
      .email(t("errors.emailInvalid")),
    subject: z.string().min(1, t("errors.subjectRequired")),
    message: z
      .string()
      .min(1, t("errors.messageRequired"))
      .min(10, t("errors.messageTooShort")),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const schema = buildContactSchema(t);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("submitting");

    try {
      // TODO(#42): replace with real API route + email delivery.
      // Simulated request for now so the UI/UX can be reviewed independently.
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (values.email.includes("@")) {
            resolve();
          } else {
            reject(new Error("Invalid submission"));
          }
        }, 1000);
      });

      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        <Box sx={{ fontWeight: 600 }}>{t("successTitle")}</Box>
        {t("successBody")}
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 640 }}
    >
      {submitState === "error" && (
        <Alert severity="error">
          <Box sx={{ fontWeight: 600 }}>{t("errorTitle")}</Box>
          {t("errorBody")}
        </Alert>
      )}

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("nameLabel")}
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={submitState === "submitting"}
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label={t("emailLabel")}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={submitState === "submitting"}
            fullWidth
          />
        )}
      />

      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("subjectLabel")}
            error={!!errors.subject}
            helperText={errors.subject?.message}
            disabled={submitState === "submitting"}
            fullWidth
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("messageLabel")}
            error={!!errors.message}
            helperText={errors.message?.message}
            disabled={submitState === "submitting"}
            multiline
            minRows={5}
            fullWidth
          />
        )}
      />

      <Button
        type="submit"
        variant="primary"
        size="large"
        disabled={submitState === "submitting"}
        sx={{ alignSelf: "flex-start" }}
      >
        {submitState === "submitting" ? (
          <>
            <CircularProgress size={18} sx={{ mr: 1, color: "inherit" }} />
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </Box>
  );
}