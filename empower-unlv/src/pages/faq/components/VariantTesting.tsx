export default function VariantTesting() {
  return (
    <div className="flex flex-col gap-y-4">
      <p>
        Several variants of the COVID-19 virus (SARS-CoV-2) have emerged during the pandemic.
        Samples with sufficient SARS-CoV-2 genetic material are tested and analyzed for combinations
        of genetic mutations found in variants.
      </p>
      <p>
        <strong>Detected Variant(s):</strong> Detection of multiple markers unique to lineages.
        <br />
        <strong>Results Unavailable:</strong> Viral concentrations are too low to conduct this type
        of testing.
      </p>
      <p>
        The data can suggest the presence of variants and can be useful for targeting follow-up
        public health action in the communities. Using next generation sequencing methods, we can
        examine the viral genome from wastewater and compare the results to viral genomes obtained
        through nasopharyngeal swabs.
      </p>
      <p>
        <strong>Are the variant results representative of a community?</strong>
        <br />
        Wastewater testing can be a useful tool for screening for the presence of variants, but
        requires sequencing of a clinical specimen to confirm their presence in humans. Because
        humans contribute fecal material to sewage, we are confident that the wastewater results are
        representative of a community.
      </p>
      <p>
        <strong>Can we observe variants change over time?</strong>
        <br />
        If there is sufficient SARS-CoV-2 genetic material in the wastewater sample, the trends in
        Southern Nevada can be monitored accurately. Because Las Vegas has a large influx of
        tourists, some wastewater sites may show more unique trends over time.
      </p>
      <p>
        <strong>Can variant testing prevent a surge of variants?</strong>
        <br />
        These results are useful for informing public health investigations and responses for
        stopping the spread of COVID-19. Washing hands, wearing masks, social distancing, and
        vaccinations still continue to be our best strategies in slowing the spread of the virus and
        new variants. The emergence of variants emphasizes the importance of continuing these
        measures
      </p>
      <p>
        To learn more about variants, visit CDC's{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.cdc.gov/covid/about/index.html"
        >
          About COVID-19
        </a>{" "}
        webpage.
      </p>
    </div>
  );
}
