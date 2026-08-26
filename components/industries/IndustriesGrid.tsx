"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@/components/ui/Grid";
import { Link } from "@/i18n/navigation";
import type { Industry } from "@/lib/content";

// Client component: uses the locale-aware <Link> as CardActionArea's
// `component`, which can't be passed across the server→client boundary. The
// page stays a Server Component and passes plain `industries` data down.
export function IndustriesGrid({ industries }: { industries: Industry[] }) {
  return (
    <Grid cols={4}>
      {industries.map((industry) => (
        <Card key={industry.slug} sx={{ height: "100%" }}>
          <CardActionArea
            component={Link}
            href={`/industries/${industry.slug}`}
            sx={{ height: "100%", alignItems: "flex-start" }}
          >
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {industry.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {industry.summary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
}
