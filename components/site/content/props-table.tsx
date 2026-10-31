// components/site/content/props-table.tsx
"use client";
import { PropDefinition } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PropsTableProps {
  props: PropDefinition[];
}

export default function PropsTable({ props }: PropsTableProps) {
  if (!props || props.length === 0) return null;

  const hasRequiredProps = props.some((prop) => prop.required === true);

  const hasExamples = props.some(
    (prop) =>
      typeof prop.example === "string" && prop.example.trim().length > 0,
  );

  return (
    <div className="p-1 md:p-2 bg-foreground/5 inset-shadow-sm inset-shadow-foreground/15 rounded-xl md:rounded-4xl overflow-hidden w-full">
      <div className="bg-background border shadow-lg/5 rounded-lg md:rounded-3xl overflow-x-auto w-full h-full">
        <Table className="w-full text-sm text-foreground">
          <TableHeader>
            <TableRow className="bg-accent! rounded-t-lg md:rounded-t-3xl">
              <TableHead className="min-w-50 max-w-70 whitespace-pre-wrap border-r px-5 py-4 font-semibold">
                Prop
              </TableHead>

              <TableHead className="min-w-50 max-w-70 whitespace-pre-wrap border-r px-5 py-4 font-semibold">
                Type
              </TableHead>

              <TableHead className="min-w-25 max-w-70 whitespace-pre-wrap border-r px-5 py-4 font-semibold">
                Default
              </TableHead>

              {hasRequiredProps && (
                <TableHead className="min-w-25 max-w-70 whitespace-pre-wrap border-r px-5 py-4 font-semibold">
                  Required
                </TableHead>
              )}

              {hasExamples && (
                <TableHead className="min-w-50 max-w-70 whitespace-pre-wrap border-r px-5 py-4 font-semibold">
                  Example
                </TableHead>
              )}

              <TableHead className="min-w-80 max-w-70 whitespace-pre-wrap px-5 py-4 font-semibold">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {props.map((p) => (
              <TableRow
                key={p.name}
                className="bg-transparent! text-muted-foreground"
              >
                <TableCell className="min-w-50 max-w-70 whitespace-pre-wrap border-r px-5 py-4 align-top font-mono text-sm">
                  <span className="rounded-sm bg-foreground/10 px-3 py-1.5">
                    {p.name}
                  </span>
                </TableCell>

                <TableCell className="min-w-50 max-w-70 whitespace-pre-wrap border-r px-5 py-4 align-top text-sm">
                  <span className="font-mono leading-relaxed">{p.type}</span>

                  {p.options && p.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.options.map((opt) => (
                        <Badge
                          key={opt}
                          className="rounded-sm bg-foreground/10 px-2.5! pt-3! pb-3.5! text-sm! text-foreground/60"
                        >
                          {opt}
                        </Badge>
                      ))}
                    </div>
                  )}
                </TableCell>

                <TableCell className="min-w-25 max-w-70 whitespace-pre-wrap border-r px-5 py-4 align-top text-sm">
                  {p.default ? (
                    <span>{p.default}</span>
                  ) : (
                    <span className="text-foreground/50">—</span>
                  )}
                </TableCell>

                {hasRequiredProps && (
                  <TableCell className="min-w-25 max-w-70 whitespace-pre-wrap border-r px-5 py-4 align-top text-sm">
                    <p className="text-center">{p.required ? "Yes" : "No"}</p>
                  </TableCell>
                )}

                {hasExamples && (
                  <TableCell className="min-w-50 max-w-70 whitespace-pre-wrap border-r px-5 py-4 align-top font-mono text-sm">
                    {p.example ? (
                      <span>{p.example}</span>
                    ) : (
                      <span className="text-foreground/50">—</span>
                    )}
                  </TableCell>
                )}

                <TableCell className="min-w-80 max-w-70 whitespace-pre-wrap px-5 py-4 align-top text-sm leading-relaxed">
                  {p.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
