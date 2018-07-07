defmodule Offerdate.Email do
  use Bamboo.Phoenix, view: Offerdate.EmailView

  def welcome_email(email) do
    base_email
    |> to(email)
    |> subject("Welcome to Offerdate!")
    |> render(:welcome)
  end

  defp base_email do
    new_email
    |> from(Application.get_env(:offerdate, Offerdate.Mailer)[:from_email])
    |> put_header("Reply-To", Application.get_env(:offerdate, Offerdate.Mailer)[:support_email])
    # This will use the "email.html.eex" file as a layout when rendering html emails.
    # Plain text emails will not use a layout unless you use `put_text_layout`
    |> put_html_layout({Offerdate.LayoutView, "email.html"})
  end
end