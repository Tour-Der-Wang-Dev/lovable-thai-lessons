
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for logging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[LINE-WEBHOOK] ${step}${detailsStr}`);
};

// Reply to LINE user
const replyToLine = async (replyToken: string, messages: any[]) => {
  const LINE_ACCESS_TOKEN = Deno.env.get("LINE_ACCESS_TOKEN");
  if (!LINE_ACCESS_TOKEN) {
    throw new Error("LINE_ACCESS_TOKEN not found");
  }

  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    logStep("LINE Reply Error", { error });
    throw new Error(`LINE API Error: ${error}`);
  }
};

// Create Flex Message for course packages
const createPackageFlexMessage = () => {
  return {
    type: "flex",
    altText: "เลือกแพ็คเกจเรียนของคุณ",
    contents: {
      type: "carousel",
      contents: [
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=General+Package",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "General Package",
                weight: "bold",
                size: "xl"
              },
              {
                type: "text",
                text: "แพ็คเกจทั่วไป",
                size: "sm",
                color: "#666666",
                margin: "md"
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "฿390",
                        weight: "bold",
                        size: "xxl",
                        color: "#3B82F6"
                      },
                      {
                        type: "text",
                        text: "/เดือน",
                        size: "sm",
                        color: "#999999",
                        margin: "md"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "primary",
                height: "sm",
                action: {
                  type: "postback",
                  label: "สั่งซื้อ General",
                  data: "action=buy&package=general&price=390"
                }
              }
            ]
          }
        },
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=CEFR+Package",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "CEFR Package",
                weight: "bold",
                size: "xl"
              },
              {
                type: "text",
                text: "แพ็คเกจ CEFR",
                size: "sm",
                color: "#666666",
                margin: "md"
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "฿590",
                        weight: "bold",
                        size: "xxl",
                        color: "#10B981"
                      },
                      {
                        type: "text",
                        text: "/เดือน",
                        size: "sm",
                        color: "#999999",
                        margin: "md"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "primary",
                height: "sm",
                action: {
                  type: "postback",
                  label: "สั่งซื้อ CEFR",
                  data: "action=buy&package=cefr&price=590"
                }
              }
            ]
          }
        },
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Combo+Package",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Combo Package",
                weight: "bold",
                size: "xl"
              },
              {
                type: "text",
                text: "แพ็คเกจรวม",
                size: "sm",
                color: "#666666",
                margin: "md"
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "฿1,500",
                        weight: "bold",
                        size: "xxl",
                        color: "#F59E0B"
                      },
                      {
                        type: "text",
                        text: "/เดือน",
                        size: "sm",
                        color: "#999999",
                        margin: "md"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "primary",
                height: "sm",
                action: {
                  type: "postback",
                  label: "สั่งซื้อ Combo",
                  data: "action=buy&package=combo&price=1500"
                }
              }
            ]
          }
        }
      ]
    }
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("LINE Webhook received");
    
    const body = await req.json();
    logStep("Request body", body);

    // Verify webhook signature (recommended for production)
    // const signature = req.headers.get("x-line-signature");
    // You should verify the signature here for security

    const events = body.events || [];
    
    for (const event of events) {
      logStep("Processing event", { type: event.type });
      
      if (event.type === "message" && event.message.type === "text") {
        const userMessage = event.message.text.toLowerCase();
        const replyToken = event.replyToken;
        
        // Handle different commands
        if (userMessage.includes("สั่งซื้อ") || userMessage.includes("ซื้อคอร์ส") || userMessage.includes("package")) {
          // Show package options
          await replyToLine(replyToken, [createPackageFlexMessage()]);
        } else if (userMessage.includes("สวัสดี") || userMessage.includes("hello")) {
          // Welcome message
          await replyToLine(replyToken, [
            {
              type: "text",
              text: "สวัสดีครับ! ยินดีต้อนรับสู่ Kru English 🎓\n\nพิมพ์ 'สั่งซื้อ' เพื่อดูแพ็คเกจเรียนของเรา\nหรือพิมพ์ 'ช่วยเหลือ' เพื่อดูคำสั่งทั้งหมด"
            }
          ]);
        } else if (userMessage.includes("ช่วยเหลือ") || userMessage.includes("help")) {
          // Help message
          await replyToLine(replyToken, [
            {
              type: "text",
              text: "📚 คำสั่งที่ใช้ได้:\n\n• 'สั่งซื้อ' - ดูแพ็คเกจเรียน\n• 'สถานะ' - ตรวจสอบการสมัครสมาชิก\n• 'ช่วยเหลือ' - ดูคำสั่งนี้\n• 'ติดต่อ' - ติดต่อทีมงาน\n\nมีคำถามเพิ่มเติม? พิมพ์ 'ติดต่อ' ได้เลยครับ!"
            }
          ]);
        } else if (userMessage.includes("ติดต่อ") || userMessage.includes("contact")) {
          // Contact info
          await replyToLine(replyToken, [
            {
              type: "text",
              text: "📞 ติดต่อทีมงาน Kru English:\n\n• LINE: @kruenglish\n• Email: support@kruenglish.com\n• Tel: 02-xxx-xxxx\n\nเปิดบริการ: จันทร์-ศุกร์ 9:00-18:00 น."
            }
          ]);
        } else {
          // Default response
          await replyToLine(replyToken, [
            {
              type: "text",
              text: "ขออภัยครับ ไม่เข้าใจคำสั่งนี้ 😅\n\nพิมพ์ 'ช่วยเหลือ' เพื่อดูคำสั่งที่ใช้ได้\nหรือพิมพ์ 'สั่งซื้อ' เพื่อดูแพ็คเกจเรียน"
            }
          ]);
        }
      } else if (event.type === "postback") {
        // Handle postback data (when user clicks buttons)
        const data = new URLSearchParams(event.postback.data);
        const action = data.get("action");
        const packageType = data.get("package");
        const price = data.get("price");
        
        if (action === "buy" && packageType && price) {
          logStep("Processing purchase", { packageType, price });
          
          // Create payment link (this will be enhanced with actual payment integration)
          const paymentMessage = {
            type: "flex",
            altText: `ชำระเงิน ${packageType} Package`,
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ชำระเงิน",
                    weight: "bold",
                    size: "xl",
                    color: "#3B82F6"
                  },
                  {
                    type: "separator",
                    margin: "md"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "lg",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "baseline",
                        spacing: "sm",
                        contents: [
                          {
                            type: "text",
                            text: "แพ็คเกจ:",
                            size: "sm",
                            color: "#666666"
                          },
                          {
                            type: "text",
                            text: `${packageType.toUpperCase()} Package`,
                            size: "sm",
                            weight: "bold"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        spacing: "sm",
                        contents: [
                          {
                            type: "text",
                            text: "ราคา:",
                            size: "sm",
                            color: "#666666"
                          },
                          {
                            type: "text",
                            text: `฿${price} /เดือน`,
                            size: "sm",
                            weight: "bold",
                            color: "#3B82F6"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                  {
                    type: "button",
                    style: "primary",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "ชำระผ่านเว็บไซต์",
                      uri: `${Deno.env.get("FRONTEND_URL") || "https://kruenglish.lovable.app"}/pricing?package=${packageType}`
                    }
                  },
                  {
                    type: "button",
                    style: "secondary",
                    height: "sm",
                    action: {
                      type: "postback",
                      label: "ชำระผ่าน PromptPay",
                      data: `action=promptpay&package=${packageType}&price=${price}`
                    }
                  }
                ]
              }
            }
          };
          
          await replyToLine(event.replyToken, [paymentMessage]);
        } else if (action === "promptpay") {
          // Handle PromptPay payment (will be implemented next)
          await replyToLine(event.replyToken, [
            {
              type: "text",
              text: "🔄 กำลังสร้าง QR Code สำหรับ PromptPay...\n\nโปรดรอสักครู่ ระบบจะส่ง QR Code ให้ในอีกไม่กี่วินาที"
            }
          ]);
        }
      }
    }

    return new Response(JSON.stringify({ status: "success" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    logStep("ERROR", { message: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
