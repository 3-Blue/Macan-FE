"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import type { LeadershipMember } from "@/lib/content";

export function LeadershipGrid({ members }: { members: LeadershipMember[] }) {
  const t = useTranslations("Leadership");
  const [selected, setSelected] = useState<LeadershipMember | null>(null);

  return (
    <Section>
      <Container>
        <Typography variant="overline" component="p" color="text.secondary">
          {t("eyebrow")}
        </Typography>
        <Heading level={1}>{t("heading")}</Heading>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
          {t("intro")}
        </Typography>
        <Grid cols={4}>
          {members.map((member) => (
            <Card key={member.id} sx={{ height: "100%" }}>
              <CardActionArea
                onClick={() => setSelected(member)}
                sx={{ height: "100%", alignItems: "flex-start", flexDirection: "column" }}
              >
                <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
                  <Image
                    src={member.photo.url}
                    alt={member.photo.alt}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <CardContent sx={{ width: "100%" }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Container>

      <Dialog open={selected !== null} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <DialogContent sx={{ position: "relative", pt: 5 }}>
            <IconButton
              aria-label={t("close")}
              onClick={() => setSelected(null)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={selected.photo.url}
                  alt={selected.photo.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="h3">
                  {selected.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selected.role}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {selected.bio}
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Section>
  );
}