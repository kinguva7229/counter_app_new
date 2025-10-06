import { html, fixture, expect } from '@open-wc/testing';
import "../counter-restart.js";

describe("CounterRestart test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <counter-restart
        title="title"
      ></counter-restart>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
