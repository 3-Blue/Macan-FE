"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Grid } from "@/components/ui/Grid";
import type { Client } from "@/lib/content";

// Client component for consistency with other grids (IndustriesGrid); links
// are external here, so there's no server/client Link-prop boundary issue,
// but CardActionArea's interactivity still needs "use client".
export function ClientsGrid({ clients }: { clients: Client[] }) {
  return (
    <Grid cols={4}>
      {clients.map((client) => (
        <Card key={client.id} sx={{ height: "100%" }}>
          <CardActionArea
            component="a"
            href={client.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ height: "100%", flexDirection: "column", alignItems: "center", py: 3 }}
          >
            <Box sx={{ width: 96, height: 96, position: "relative", mb: 1 }}>
              <Image
                src={client.logoUrl}
                alt={client.name}
                fill
                sizes="96px"
                style={{ objectFit: "contain" }}
              />
            </Box>
            <CardContent sx={{ textAlign: "center", pt: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {client.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {client.category}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
}