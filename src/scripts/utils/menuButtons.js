import { pages } from "../pages";

export const menuLinks = [
    {
        name: "home",
        href: pages.home.path,
        icon: "/icons/home.png",
        className: "home-link",
        isLink: true,
    },
    {
        name: "humanoid",
        href: pages.humanoid.path,
        options: [{
            name: "humanoid robot",
            products: [
                {
                    name: "h2",
                    thumbnail: "/images/menu/desktop/humanoid/h2.png", image: "/images/menu/h2.png",
                    link: pages.h2.path
                },

                {
                    name: "r1",
                    thumbnail: "/images/menu/desktop/humanoid/r1.png", image: "/images/menu/r1.png",
                    link: pages.r1.path
                },
                {
                    name: "g1",
                    thumbnail: "/images/menu/desktop/humanoid/g1.png", image: "/images/menu/g1.png",
                    link: pages.g1.path
                },
                {
                    name: "h1/h2",
                    thumbnail: "/images/menu/desktop/humanoid/h1_h2.png", image: "/images/menu/h2.png",
                    link: pages["h1-h2"].path
                },
            ]
        }]
    },

    {
        name: "quadruped",
        href: pages.quadruped.path,
        options: [

            {
                name: "Wheeled Legged Robot Dog",
                products: [
                    {
                        name: "Go2- W",
                        thumbnail: "/images/menu/desktop/quadruped/go2_w.png", image: "/images/menu/go2_w.png",
                        link: pages.go2_w.path
                    },
                    {
                        name: "B2- W",
                        thumbnail: "/images/menu/desktop/quadruped/b2_w.png", image: "/images/menu/b2_w.png",
                        link: pages.b2_w.path
                    },

                ]
            },

            {
                name: "Legged Robot Dog",
                products: [
                    {
                        name: "Go2",
                        thumbnail: "/images/menu/desktop/quadruped/go2.png", image: "/images/menu/go2.png",
                        link: pages.go2.path
                    },
                    {
                        name: "B2",
                        thumbnail: "/images/menu/desktop/quadruped/b2.png", image: "/images/menu/b2.png",
                        link: pages.b2.path
                    },
                    {
                        name: "A2",
                        thumbnail: "/images/menu/desktop/quadruped/a2.png", image: "/images/menu/a2.png",
                        link: pages.a2.path
                    },

                ]
            },

            {
                name: "Manipulators",
                products: [
                    {
                        name: "z1 / d1",
                        thumbnail: "/images/menu/desktop/quadruped/z1_d1.png", image: "/images/menu/z1_d1.png",
                        link: pages.manipulators.path
                    },
                    // {
                    //     name: "d1",
                    //     thumbnail: "/images/menu/desktop/quadruped/d1.png", image: "/images/menu/d1.png",
                    //     link: pages.manipulators.path
                    // },


                ]
            },

            {
                name: "Perception",
                products: [
                    {
                        name: "4D LIDAR L2",
                        thumbnail: "/images/menu/desktop/quadruped/4d.png", image: "/images/menu/4d.png",
                        link: pages.perception.path
                    },

                ]
            },

        ],
    },


    {
        name: "digital human",
        href: pages.digital.path,
        options: [



            {
                name: "Digital Human",
                products: [
                    {
                        name: pages.holographic_cabinet.name,
                        thumbnail: "/images/menu/desktop/digital/holo.png", image: "/images/menu/digital.png",
                        link: pages.holographic_cabinet.path
                    },
                    {
                        name: pages.oled_mobile_robot.name,
                        thumbnail: "/images/menu/desktop/digital/holo.png", image: "/images/menu/digital.png",
                        link: pages.oled_mobile_robot.path
                    },

                ]
            },]
    },

    {
        name: "industry",
        href: pages.industry.path,
        options: [
        //     {
        //     name: "industry robot",
        //     products: [
        //         {
        //             name: "h2",
        //             thumbnail: "", image: "",
        //             link: ""
        //         }
        //     ]
        // }
    ],
        isLink: true,
    },

];
