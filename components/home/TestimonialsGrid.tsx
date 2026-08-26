import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import type { Testimonial } from "@/lib/content";

// Client testimonials. Content is passed in (resolved for the active locale)
// by the page. Quotes are currently placeholder demo data.
export function TestimonialsGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const t = useTranslations("Home");
  return (
    <Section>
      <Container>
        <Heading level={2}>{t("testimonialsHeading")}</Heading>

        <Grid cols={3}>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  &ldquo;{testimonial.quote}&rdquo;
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: "auto",
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {testimonial.initials}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" component="p">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
